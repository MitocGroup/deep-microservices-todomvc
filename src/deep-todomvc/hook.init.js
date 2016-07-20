'use strict';

module.exports = function(callback) {
  if (!this.microservice.property.rootMicroservice) {
    console.error('Seems like there is no root microservice to copy learn.json to. Skipping...');
    callback();
    return;
  }

  var exec = require('child_process').exec;
  var path = require('path');

  var source = path.join(this.microservice.autoload.frontend, 'learn.json');
  var dist = this.microservice.property.rootMicroservice.autoload.frontend;
  var ensureFrontendDeps = require('./ensure-frontend-deps');

  exec('cp ' + source + ' ' + dist, (error) => {
    if (error) {
      console.error('Error while copying learn.json', error);
      callback();
      return;
    }

    console.log('learn.json was successfully copied into deep-root-angular');

    ensureFrontendDeps.call(this, callback);
  });
};
