'use strict';

import chai from 'chai';
import dir from 'node-dir';
import path from 'path';
import {Exec} from '../../../node_modules/deepify/lib.compiled/Helpers/Exec';

suite('Functional tests', () => {

  let inputEventsArray = [];
  let inputEventsFilesArray = [];
  let expectedResultsArray = [];
  let expectedResultsFilesArray = [];
  let i = 0;

  suiteSetup((done) => {

    const TEST_ASSERTS_DIR = '../../../../test/task/update/test-asserts';
    let dirPath = path.join(__dirname, TEST_ASSERTS_DIR);

    dir.readFiles(dirPath, {
        match: /result.json$/,
        exclude: /^\./,
      }, (err, content, next) => {
        if (err) {
          throw err;
        }

        expectedResultsArray.push(content);
        next();
      },
      (err, files) => {
        if (err) {
          throw err;
        }

        expectedResultsFilesArray = files;
      });

    dir.readFiles(dirPath, {
        match: /payload.json$/,
        exclude: /^\./,
      }, (err, content, next) => {
        if (err) {
          throw err;
        }

        inputEventsArray.push(content);
        next();
      },
      (err, files) => {
        if (err) {
          throw err;
        }

        inputEventsFilesArray = files;
        done();
      });
  });

  test('Check relevant of data', () => {
    for (i = 0; i < inputEventsFilesArray.length; i++) {
      chai.expect(inputEventsFilesArray[i].replace('payload.json', '')).to.equal(
        expectedResultsFilesArray[i].replace('result.json', '')
      );
    }
  });

  test('Check lambdas', () => {

    for (i = 0; i < inputEventsArray.length; i++) {
      let eventStr = '\'' + inputEventsArray[i].replace(/(\r\n|\n|\r)/gm, '') + '\'';
      let cmd = `deepify run-lambda ../../../node_modules/deep-todo-task-update/ -e=${eventStr} -p`;
      let runLambdaCmd = new Exec(cmd);

      runLambdaCmd.cwd = __dirname;

      let lambdaResult = runLambdaCmd.runSync();
      let expectedResult = JSON.parse(expectedResultsArray[i]);
      let actualResult = (lambdaResult.failed) ? JSON.parse(lambdaResult.error) : JSON.parse(lambdaResult.result);

      chai.expect(actualResult).to.eql(expectedResult, `for payload from: ${inputEventsFilesArray[i]}`);
    }

  });

});
