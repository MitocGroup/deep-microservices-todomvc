'use strict';

const fs = require('fs');
const path = require('path');

const { runChildCmd, getDeepFramework } = require('./utils');

const frontendPath = path.join(__dirname, 'frontend');
const buildPath = path.join(frontendPath, '_build');

module.exports = function (callback) {
  const appParams = this.microservice.parameters;
  const runAsApi = appParams.backend.runAsApi;

  console.log('Downloading latest deep-framework from GitHub');
  getDeepFramework(`${frontendPath}/src/assets/js`).then(() => {

    console.log('Clean-up build directory');
    return runChildCmd('rm -rf frontend/_build/*');

  }).then(() => {

    if (runAsApi) {
      console.warn('Running in API mode');

      const apiTmpl = `<!doctype html><html lang="en"><head><title>ng-todo</title></head><body></body></html>`;
      fs.writeFile(`${buildPath}/index.html`, apiTmpl, (err) => {
        if (err) throw err;

        callback();
      });
    } else {
      console.warn('Running in full-stack mode');

      runChildCmd('cd frontend && npm run build').then(() => {
        callback();
      });
    }

  }).catch(err => {
    throw err;
  });
};
