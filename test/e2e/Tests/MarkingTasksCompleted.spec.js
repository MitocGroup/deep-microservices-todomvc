/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that clicking on checkbox makes task completed', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Create the first task', function() {
    TaskList.addTask('first test task');
  });

  it('Create the second task', function() {
    TaskList.addTask('second test task');

    //Waiting for the [All] button to become displayed
    browser.wait(protractor.ExpectedConditions.visibilityOf(TaskList.allBtn));

    //Verifying that tasks count is equal to 2
    TaskList.itemsLeftNumber(2);
  });

  it('Validating that clicking on checkbox makes task completed', function() {
    //Clicking on the [Check] button for the first task (this makes it completed)
    TaskList.checkBtnGeneral.get(0).click();

    //Verifying that tasks count became equal to 1
    TaskList.itemsLeftNumber(1);
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
