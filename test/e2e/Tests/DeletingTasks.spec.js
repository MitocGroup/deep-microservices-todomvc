/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that new task can be successfully deleted', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Add new task', function() {
    TaskList.addTask('protractor test task');
  });

  it('Hover on created task and validating that [x] button appears', function() {
    browser.actions().mouseMove(TaskList.firstTask).perform();

    expect(TaskList.deleteBtn.isDisplayed()).toEqual(true);
  });

  it('Delete a task and validating that task is deleted', function() {
    TaskList.deleteBtn.click();

    expect(TaskList.totalTasksCount()).toEqual(0);
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});