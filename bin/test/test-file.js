'use strict';

let child_process = require('child_process');
let path = require('path');

let compileDev = child_process.spawn(`deepify`, ['compile', 'dev', path.join(__dirname, process.argv[2]), '-s']);


compileDev.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

compileDev.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

compileDev.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

compileDev.on('uncaughtException', (uncaughtException) => {
  console.log(`child process exited with uncaughtException ${uncaughtException}`);
});