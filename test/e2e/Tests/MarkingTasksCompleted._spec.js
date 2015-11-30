'use strict';

var taskList = require('../POMs/TasksList.js');

describe('Verify that tasks can be marked completed/active', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(taskList.url);
    //Deleting all existing tasks
    taskList.clearAllTasks();
  });

  it('Validating that tasks can be successfully marked completed/active and then filtered', function() {
    //Creating two new tasks
    taskList.addTask('first test task');
    taskList.addTask('second test task');

    //Waiting for the [All] button to become displayed
    browser.wait(protractor.ExpectedConditions.visibilityOf(taskList.allBtn));

    //Clicking on the [Check] button for the first task (this makes it completed)
    taskList.checkBtnGeneral.get(0).click();

    //Clicking on the [Completed] button
    taskList.completedBtn.click();

    //Verifying that only one task is displayed on the page
    expect(taskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was marked as completed
    expect(taskList.taskNameGeneral.get(0).getText()).toEqual('first test task');

    //Clicking on the [Active] button
    taskList.activeBtn.click();

    //Verifying that only one task is displayed on the page
    expect(taskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was not marked as completed
    expect(taskList.taskNameGeneral.get(0).getText()).toEqual('second test task');
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    taskList.clearAllTasks();
  });

});
