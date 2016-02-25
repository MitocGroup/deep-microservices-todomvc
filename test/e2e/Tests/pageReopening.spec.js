/* global protractor */
/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');
var config = require('../protractor.config.js');

describe('Verify that new task can be successfully added', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Adding new task and validating that task is added', function() {
    TaskList.addTask('protractor test task');

    browser.get(TaskList.url, config.config.jasmineNodeOpts.defaultTimeoutInterval);

    browser.wait(protractor.ExpectedConditions.visibilityOf(TaskList.allBtn));

    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('protractor test task');
  });
});