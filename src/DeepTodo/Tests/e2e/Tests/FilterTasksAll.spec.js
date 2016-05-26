/* global browser */
/* global protractor */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that [All] button displays both active/completed tasks', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Create the first task', function() {
    TaskList.addTask('first test task');
  });

  it('Create the second task', function() {
    TaskList.addTask('second test task', true);
  });

  it('Clicking on the [Check] button for the first task (this makes it completed)', function() {
    TaskList.checkBtnGeneral.get(0).click();
  });

  it('Validating that [Completed] button displays only completed tasks', function() {
    //Clicking on the [Completed] button
    TaskList.completedBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was marked as completed
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('first test task');
  });

  it('Validating that [Active] button displays only active tasks', function() {
    //Clicking on the [Active] button
    TaskList.activeBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that valid task is displayed: the one which was not marked as completed
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('second test task');
  });

  it('Validating that [All] button displays both active/completed tasks', function() {
    //Clicking on the [All] button
    TaskList.allBtn.click();

    //Verifying that only one task is displayed on the page
    expect(TaskList.totalTasksCount()).toEqual(2);
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
