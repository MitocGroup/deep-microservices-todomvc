/* global protractor */
/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that new task can be successfully added', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Adding new task and validating that task is added', function() {
    TaskList.addTask('protractor test task');

    browser.get(TaskList.url);

    browser.wait(protractor.ExpectedConditions.visibilityOf(TaskList.allBtn));

    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('protractor test task');
  });
});