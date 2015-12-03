/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that new task can be successfully deleted', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(TaskList.url);

    //Deleting all existing tasks
    TaskList.clearAllTasks();
  });

  it('Deleting a task and validating that task is deleted', function() {

    //Adding new task
    TaskList.addTask('protractor test task');

    //Hovering on created task
    browser.actions().mouseMove(TaskList.firstTask).perform();

    //Verifying that [x] button appeared next to task name
    expect(TaskList.deleteBtn.isDisplayed()).toEqual(true);

    //Clicking on [x] button to delete created task
    TaskList.deleteBtn.click();

    //Verifying that there are no tasks after deleting
    expect(TaskList.totalTasksCount()).toEqual(0);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
