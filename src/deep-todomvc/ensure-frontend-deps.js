/**
 * Created by CCristi on 6/25/16.
 */

'use strict';

module.exports = function(cb) {
  const fs = require('fs');
  const path = require('path');
  const process = require('child_process');
  let frontendPath = this.microservice.autoload.frontend;

  if (!fs.existsSync(path.join(frontendPath, 'js', 'vendor')) && path.basename(frontendPath) !== '_build') {
    process.exec('jspm install', {
      'cwd': path.join(frontendPath, 'js')
    }, error => {
      if (error) {
        console.error('Error while installing frontend dependencies', error);
      }

      console.log(`Frontend dependencies have been intalled for ${this.microservice.identifier}`);
      cb();
    });
  } else {
    console.log(`Skipping installing frontend dependencies for ${this.microservice.identifier}`);
    cb();
    return;
  }
};
