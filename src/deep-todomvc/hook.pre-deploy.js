'use strict';

const path = require('path');
const { runChildCmd, getDeepFramework } = require('./utils');

const frontendPath = path.join(__dirname, 'frontend');

module.exports = function (callback) {
  console.log('Downloading latest deep-framework from GitHub');
  getDeepFramework(`${frontendPath}/src/assets/js`).then(() => {

    console.log('Clean-up build directory');
    return runChildCmd('rm -rf frontend/_build/*');

  }).then(() => {
    console.log('Preparing application for production');

    runChildCmd('cd frontend && npm run build').then(() => {
      callback();
    });
  }).catch(err => {
    throw err;
  });
};
