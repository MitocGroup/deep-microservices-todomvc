'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawn } = require('child_process');

const msPath = path.join(__dirname);

/**
 * Print filtered output
 * @param {string} str
 * @param {RegExp} regexp
 */
function filterLog(str, regexp) {
  if (regexp.test(str)) {
    console.log(str.trim());
  }
}

/**
 * Run child shell command
 * @param {string} cmd
 * @param {RegExp} filerRegexp
 * @returns {Promise}
 */
function runChildCmd(cmd, filerRegexp = /.*/) {
  return new Promise((resolve, reject) => {
    let err = new Error(cmd);
    let childCmd = spawn(cmd, { shell: true, cwd: msPath });

    childCmd.stdout.on('data', data => {
      filterLog(data.toString(), filerRegexp);
    });

    childCmd.stderr.on('data', error => {
      err.message = error.toString();
      filterLog(error.toString(), filerRegexp);
    });

    childCmd.on('exit', code => {
      return (code === 1) ? reject(err) : resolve(code);
    });
  });
}

exports.runChildCmd = runChildCmd;

/**
 * Download latest deep-framework
 * @param {string} downloadTo
 * @returns {Promise}
 */
function getDeepFramework(downloadTo) {
  return new Promise((resolve, reject) => {
    const deepFramework =
      'https://raw.githubusercontent.com/MitocGroup/deep-framework/master/src/deep-framework/browser/framework.js';

    https.get(deepFramework, res => {
      let rawData = '';

      res.on('data', data => {rawData += data;});
      res.on('end', () => {
        fs.writeFileSync(path.resolve(downloadTo, 'deep-framework.min.js'), rawData);
        resolve();
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

exports.getDeepFramework = getDeepFramework;
