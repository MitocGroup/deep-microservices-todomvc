/* global browser */
/* global protractor */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that tasks count updates after clicking on "Select All" checkbox', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Create the first task', function() {
    TaskList.addTask('first test task');
  });

  it('Create the second task and verify that count is 1', function() {
    TaskList.addTask('second test task', true);

    //Waiting for the [All] button to become displayed
    browser.wait(protractor.ExpectedConditions.visibilityOf(TaskList.allBtn));

    TaskList.itemsLeftNumber(2);
  });

  it('Clicking on the "Select All" checkbox and verify that count becomes 0', function() {
    TaskList.checkAll.click();

    TaskList.itemsLeftNumber(0);
  });

  it('Clicking on the "Select All" checkbox again and verify that count becomes 2', function() {
    TaskList.checkAll.click();

    TaskList.itemsLeftNumber(2);
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
