'use strict';

//@todo: OPTIMISATION: in pre-deepify copy only lambdas zip files. Avoid copying source code.

var os            = require('os');
var fs            = require('fs');
var path          = require('path');
var mktemp        = require('mktemp');
var shelljs       = require('shelljs');
var Log           = require('./logger');

var DEFAULT_DEEPLOY_JSON_NAME     = 'deeploy.json';
var DEFAULT_DEEPLOY_CFG_JSON_NAME = '.cfg.deeploy.json';

/**
 * Adapter for deep deepify
 * @param microserviceNames
 * @param logger
 * @constructor
 */
function DeepifyDeploy(microserviceNames, logger) {

  this.microServiceNames    = microserviceNames;
  this.rootPath_            = process.cwd();
  this.deeployJSONName_     = DEFAULT_DEEPLOY_JSON_NAME; //@todo: make it dynamic
  this.deeployCfgJSONName_  = DEFAULT_DEEPLOY_CFG_JSON_NAME; //@todo: make it dynamic
  this.deeployJSONPath_     = path.join(__dirname, 'deepify-deploy', this.deeployJSONName_);
  this.deeployCfgJSONPath_  = path.join(__dirname, 'deepify-deploy', this.deeployCfgJSONName_);
  this.tmpDirectoryPath_    = null;
  this.logger               = logger || new Log();
  this.options              = {};
  this.fileFilterPatterns   = [];
}

/**
 * Converts options object into CLI string
 * @returns {string}
 * @private
 */
DeepifyDeploy.prototype.optionsToString_ = function() {
  var _this = this;
  var out = [];

  for (var option in _this.options) {
    if (typeof _this.options[option] === 'boolean') {
      out.push('--' + option);
    } else {
      out.push('--' + option + '=' + _this.options[option]);
    }
  }

  return out.join(' ');
};

/**
 * Set options for CLI deep deepify
 * @param options
 * @returns {DeepifyDeploy}
 */
DeepifyDeploy.prototype.setOptions = function(options) {
  var _this = this;

  if (!options || typeof options !== 'object') {
    return this;
  }

  for (var option in options) {
    _this.options[option] = options[option];
  }

  return _this;
};

DeepifyDeploy.prototype.registerFileFilterPattern = function(pattern, shouldMatchFlag) {
  shouldMatchFlag = (typeof shouldMatchFlag === 'undefined') ? true : shouldMatchFlag;

  var _this = this;
  var i = 0;
  var patternAlreadyExists = false;

  for (i = 0; i < _this.fileFilterPatterns.length; i++) {
    if (_this.fileFilterPatterns[i].pattern === pattern) {
      _this.fileFilterPatterns[i].match = shouldMatchFlag;
      patternAlreadyExists = true;
    }
  }

  if (!patternAlreadyExists) {
    _this.fileFilterPatterns.push({
      pattern: pattern,
      match: shouldMatchFlag,
    });
  }

  return _this;
};

/**
 * Creates a temporary directory for the deployed property
 * @param cb
 * @returns {*}
 * @private
 */
DeepifyDeploy.prototype.getTmpDir_ = function(cb) {
  var _this = this;

  if (_this.tmpDirectoryPath_ !== null) {
    return cb(null, _this.tmpDirectoryPath_);
  }

  var tmp = os.tmpdir();

  return mktemp.createDir(path.join(tmp, 'deep-mg-property.XXXXXXX'), function(err, tmpDirPath) {
    if (!err) {
      _this.tmpDirectoryPath_ = tmpDirPath;
    }

    return cb(err, tmpDirPath);
  });
};

/**
 * Prepares for deepify deploy
 * @param cb
 * @private
 */
DeepifyDeploy.prototype.preDeepify_ = function(cb) {
  var _this = this;

  var fileRequiredInPropertyBuildFilter_ = function(file) {
    var shouldBeCopied = true;
    var i;

    for (i = 0; i < _this.fileFilterPatterns.length; i++) {

      if (_this.fileFilterPatterns[i].match) {
        shouldBeCopied = (shouldBeCopied && !!file.match(_this.fileFilterPatterns[i].pattern));
      } else {
        shouldBeCopied = (shouldBeCopied && !!!file.match(_this.fileFilterPatterns[i].pattern));
      }
    }

    return shouldBeCopied;
  };

  _this.getTmpDir_(function(err, tmpDirectoryPath) {
    if (err) {
      _this.logger.error('Failed to create tmp directory: ' + err);
      return cb(err);
    }

    _this.logger.info('Created tmp directory ' + tmpDirectoryPath);

    //Copy deeploy.json
    if (fs.existsSync(_this.deeployJSONPath_)) {
      var tmpDeployJSONPath = path.join(tmpDirectoryPath, DEFAULT_DEEPLOY_JSON_NAME);
      _this.logger.info('Copying ' + DEFAULT_DEEPLOY_JSON_NAME);
      shelljs.cp(_this.deeployJSONPath_, tmpDeployJSONPath);
    } else {
      return cb('Deeploy JSON not found in path ' + _this.deeployJSONPath_);
    }

    //Copy config file
    if (fs.existsSync(_this.deeployCfgJSONPath_)) {
      _this.logger.info('Copying ' + DEFAULT_DEEPLOY_CFG_JSON_NAME);
      shelljs.cp(_this.deeployCfgJSONPath_, path.join(tmpDirectoryPath, DEFAULT_DEEPLOY_CFG_JSON_NAME));
    } else {
      _this.logger.info(DEFAULT_DEEPLOY_CFG_JSON_NAME + ' not found. Your property will be created');
    }

    //Copy microservice files
    var msFoldersToCopy = [];
    var msFilesToCopy = [];

    _this.microServiceNames.forEach(function(microServiceName) {

      var microservicePath = path.join(_this.rootPath_, microServiceName);

      msFoldersToCopy.push(microservicePath);

      msFilesToCopy = msFilesToCopy.concat(shelljs.find(microservicePath).filter(fileRequiredInPropertyBuildFilter_));
    });

    _this.logger.info('Start copying microservices to the property folder');

    var i = 0;
    var r = path.join(_this.rootPath_, path.sep);
    var fullPath;
    var tmpFullPath;
    var relativePath;

    for (i = 0; i < msFilesToCopy.length; i++) {
      fullPath = msFilesToCopy[i];
      relativePath = fullPath.replace(r, '');
      tmpFullPath = path.join(tmpDirectoryPath, relativePath);

      if (shelljs.test('-d', fullPath)) {
        shelljs.mkdir('-p', tmpFullPath);
      } else {
        shelljs.cp('-f', fullPath, tmpFullPath);
      }

      _this.logger.update('Copied ' + i + ' out of ' + msFilesToCopy.length + ' files');
    }

    _this.logger.update('\n');

    _this.logger.info('Finished copying microservices to the property folder');

    return cb();
  });
};

/**
 * Post deepify deploy
 * @param cb
 * @private
 */
DeepifyDeploy.prototype.postDeepify_ = function(cb) {
  var _this = this;

  _this.getTmpDir_(function(err, tmpDir) {
    if (err) {
      return cb(err);
    }

    shelljs.cp('-f', path.join(tmpDir, DEFAULT_DEEPLOY_CFG_JSON_NAME), _this.deeployCfgJSONPath_);

    return cb();
  });
};

/**
 * CLI deepify deploy call
 * @param cb
 */
DeepifyDeploy.prototype.deepify = function(cb) {
  var _this = this;

  return _this.preDeepify_(function(err) {
    if (err) {
      return cb(err);
    }

    _this.getTmpDir_(function(err, tmpDir) {
      if (err) {
        return cb(err);
      }

      var options = _this.optionsToString_();
      var deepifyBinaryPath = shelljs.exec('which deepify', {silent:true}).output.replace(/(\r\n|\n|\r)/gm, '');

      var child = shelljs.exec([deepifyBinaryPath, 'deploy', options, tmpDir].join(' '), {silent:true}, function(err) {
        if (err) {
          return cb(err);
        }

        return _this.postDeepify_(function(err) {
          //Post deepify
          return cb(err);
        });
      });

      child.stdout.on('data', function(data) {
        _this.logger.info(data);
      });

      child.stderr.on('data', function(data) {
        _this.logger.error(data);
      });
    });
  });
};

module.exports = DeepifyDeploy;
