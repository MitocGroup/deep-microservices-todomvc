/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that [Completed] button filters tasks and displays only completed ones', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(TaskList.url);

    //Deleting all existing tasks
    TaskList.clearAllTasks();
  });

  it('Validating that [Completed] button filters tasks and displays only completed ones', function() {
    //Creating two new tasks
    TaskList.addTask('first test task');
    TaskList.addTask('second test task');

    //Clicking on the [Check] button for the first task (this makes it completed)
    TaskList.checkBtnGeneral.get(0).click();

    //Clicking on the [Completed] button
    TaskList.completedBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was marked as completed
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('first test task');
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
