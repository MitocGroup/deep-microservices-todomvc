'use strict';

require('colors');

var path          = require('path');
var fs            = require('fs');
var dirsum        = require('dirsum');
var archiver      = require('archiver');
var getFileList   = require('./utils').getFileList;

function Lambda(lambdaPath, logger) {
  this.logger = logger;
  this.name = path.basename(lambdaPath);
  this.lambdaPath = lambdaPath;
  this.dirName = path.basename(path.dirname(lambdaPath));
  this.fullName = (this.dirName + '/' + this.name).cyan;
  this.zipPath = path.join(path.dirname(lambdaPath), this.name + '.zip');
  this.dependenciesPath = path.join(lambdaPath, 'node_modules');
  this.checksumPath =  path.join(path.dirname(lambdaPath), this.name + '.sfv');
  this.requiresRebuild_ = null;
}

/**
 * Generates lambda checksum
 * @param cb
 * @returns {*}
 */
Lambda.prototype.generateCheckSum = function(cb) {
  return dirsum.digest(this.lambdaPath, 'sha1', function(err, hashes) {
    if (err) {
      return cb(err);
    }

    return cb(null, hashes.hash);
  });
};

/**
 * Retrieve checksum of lambda
 * @param cb
 */
Lambda.prototype.getCheckSum = function(cb) {
  var checkSumFileName = this.checksumPath;
  return fs.exists(checkSumFileName, function(exists) {
    if (!exists) {
      return cb(null, false);
    }

    fs.readFile(checkSumFileName, function(err, data) {
      var checksum = data.toString();
      return cb(null, checksum);
    });
  });
};

/**
 * Stores checksum of lambda
 * @param cb
 */
Lambda.prototype.setCheckSum = function(cb) {
  var checkSumFileName = this.checksumPath;

  return this.generateCheckSum(function(err, checksum) {
    if (err) {
      return cb(err);
    }

    return fs.writeFile(checkSumFileName, checksum, function(err) {
      return cb(err);
    });
  });
};

/**
 * Archive lambda
 * @param cb
 * @returns {*}
 */
Lambda.prototype.pack = function(cb) {

  var _this = this;

  //_this.logger.info('Started packing ' + _this.fullName + ' lambda');

  var archive     = archiver.create('zip', {
    comment: _this.fullName
  });

  return getFileList(_this.lambdaPath, function(err, fileList) {

    var relativeFilePaths = fileList.map(function(filePath) {
      return filePath.replace(path.join(_this.lambdaPath, '/'), '');
    });

    var filesToArchive = [{
      cwd:    _this.lambdaPath,
      src:    relativeFilePaths,
      expand: true
    }];

    var output = fs.createWriteStream(_this.zipPath);

    output.on('close', function() {
      var pointer = archive.pointer();
      var sizeMB = Math.round(pointer / (1024 * 1024) * 100) / 100;
      _this.logger.info(_this.fullName + ' finished packing. Archived files weight ' + (sizeMB + ' MB').yellow);

      return _this.setCheckSum(function(err) {
        if (err) {
          _this.logger.err('Failed to persist checksum for ' + _this.fullName);
        } else {
          _this.logger.trace('Persisted checksum for ' + _this.fullName);
        }

        return cb(null);
      });
    });

    archive.on('error', function(err) {
      _this.logger.error('An error occurred during archive creation for ' + _this.fullName + ': ' + err);
      return cb(err);
    });

    archive.pipe(output);

    archive.bulk(filesToArchive);

    archive.finalize();
  });
};

Lambda.prototype.requiresRebuild = function(cb) {
  var _this = this;

  if (_this.requiresRebuild_ !== null) {
    return cb(null, _this.requiresRebuild_);
  }

  return fs.exists(_this.zipPath, function(zipExists) {
    if (!zipExists) {
      _this.requiresRebuild_ = true;
      return cb(null, _this.requiresRebuild_);
    }

    return _this.getCheckSum(function(err, currentChecksum) {
      if (err) {
        _this.logger.error(err);
        _this.requiresRebuild_ = true;
        return cb(null, _this.requiresRebuild_);
      }

      _this.logger.trace('Generating lambda checksum');

      return _this.generateCheckSum(function(err, newChecksum) {
        if (err) {
          _this.logger.error(err);
          _this.requiresRebuild_ = true;
          return cb(err, _this.requiresRebuild_);
        }

        if (currentChecksum === newChecksum) {
          _this.requiresRebuild_ = false;
        } else {
          _this.requiresRebuild_ = true;
        }

        return cb(null, _this.requiresRebuild_);
      });
    });
  });
};

module.exports = Lambda;