/* global browser */
/* global protractor */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that [All] button displays both active/completed tasks', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(TaskList.url);

    //Deleting all existing tasks
    TaskList.clearAllTasks();
  });

  it('Validating that [All] button displays both active/completed tasks', function() {
    //Creating two new tasks
    TaskList.addTask('first test task');
    TaskList.addTask('second test task');

    //Waiting for the [All] button to become displayed
    browser.wait(protractor.ExpectedConditions.visibilityOf(TaskList.allBtn));

    //Clicking on the [Check] button for the first task (this makes it completed)
    TaskList.checkBtnGeneral.get(0).click();

    //Clicking on the [Completed] button
    TaskList.completedBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was marked as completed
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('first test task');

    //Clicking on the [Active] button
    TaskList.activeBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was not marked as completed
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('second test task');

    //Clicking on the [All] button
    TaskList.allBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(2);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
