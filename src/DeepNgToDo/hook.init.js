'use strict';

var exports = module.exports = function(callback) {

  var exec = require("child_process").exec;
  var path = require('path');

  var source = path.join(__dirname, 'Frontend/learn.json');
  var dist = path.join(__dirname, '../DeepNgRoot/Frontend');

  exec('cp ' + source + ' ' + dist, function(error, stdout, stderr) {
    if (error) {
      console.error('Error while copying learn.json', error);
      callback();
      return;
    }

    console.log('learn.json was successfully copied into DeepNgRoot');

    callback();
  })
};
