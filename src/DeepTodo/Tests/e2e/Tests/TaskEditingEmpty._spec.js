/* global browser */
/* global protractor */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that task deletes if it is empty during updating', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Create the first task', function() {
    TaskList.addTask('first test task');
  });

  it('Create the second task', function() {
    TaskList.addTask('second test task', true);

    //Verifying that there are 2 tasks displayed
    expect(TaskList.totalTasksCount()).toEqual(2);
  });

  it('Clear previous task name', function() {
    //Double click on the task to make it editable
    browser.actions().doubleClick(TaskList.taskNameGeneral.get(0)).perform();

    //Removing previous task name from input
    TaskList.editTask.clear();
  });

  it('Save the task and verify that it is deleted', function() {
    //Pressing "enter" button
    TaskList.editTask.sendKeys(protractor.Key.ENTER);

    //Verifying that there is 1 task displayed
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that proper task is displayed (the one which was not deleted)
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('second test task');
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
