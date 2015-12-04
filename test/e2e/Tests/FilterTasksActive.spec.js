/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that [Active] button filters tasks and displays only active ones', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(TaskList.url);

    //Deleting all existing tasks
    TaskList.clearAllTasks();
  });

  it('Create the first task', function() {
    TaskList.addTask('first test task');
  });

  it('Create the second task', function() {
    TaskList.addTask('second test task');
  });

  it('Clicking on the [Check] button for the first task (this makes it completed)', function() {
    TaskList.checkBtnGeneral.get(0).click();
  });

  it('Validating that [Active] button filters tasks and displays only active ones', function() {
    //Clicking on the [Active] button
    TaskList.activeBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was not marked as completed
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('second test task');
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
