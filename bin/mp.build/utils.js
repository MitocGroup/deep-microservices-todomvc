'use strict';

var fs      = require('fs');
var path    = require('path');

function getFileList(dir, cb) {

  var results = [];

  fs.readdir(dir, function(err, list) {
    if (err) {
      return cb(err);
    }

    var pending = list.length;
    if (!pending) {
      return cb(null, results);
    }

    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          getFileList(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) {
              cb(null, results);
            }
          });
        } else {
          results.push(file);
          if (!--pending) {
            cb(null, results);
          }
        }
      });
    });
  });
}

function getFolderList(dir) {

  if (!fs.existsSync(dir)) {
    return [];
  }

  var list = fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });

  list = list.map(function(dirName) {
    return path.join(dir, dirName);
  });

  return list;
  /*for (var i=0; i<list.length; i++) {
   list[i] = path.join(dir, list[i]);
   }*/
}

function Response(logger) {
  this.logger = logger;
}

Response.prototype.fail = function(error) {
  if (error) {
    this.logger.fatal(error);
  } else {
    this.logger.fatal('Failed without a reason');
  }

  return process.exit(1);
};

Response.prototype.succeed = function(results) {
  if (results) {
    this.logger.info(results);
  }

  return process.exit(0);
};

module.exports = {
  getFileList: getFileList,
  getFolderList: getFolderList,
  Response: Response
};