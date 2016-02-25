'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that [Clear Completed] button appears if at least one task is completed', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Add first new task', function() {
    TaskList.addTask('protractor test task1');
  });

  it('Add second new task', function() {
    TaskList.addTask('protractor test task2', true);

    //Verify that [Clear Completed] button is not displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(false);
  });

  it('Verify that [Clear Completed] button appears after completing one task', function() {
    //Clicking on the first task's checkbox, it will make it completed
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that [Clear Completed] button becomes displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(true);
  });

  it('Verify that [Clear Completed] button disappears after making task active again', function() {
    //Clicking on the first task's checkbox again, it will the task active again
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that [Clear Completed] button becomes not displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(false);
  });

  it('Verify that [Clear Completed] button appears after clicking on [Select All] button', function() {
    //Clicking on the "Select All" checkbox, it will make all tasks completed
    TaskList.checkAll.click();

    //Verifying that there are 2 tasks displayed before deleting
    expect(TaskList.totalTasksCount()).toEqual(2);

    //Verify that [Clear Completed] button becomes displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(true);
  });

  it('Verify that there are no tasks displayed after deleting', function() {
    //Clicking on [Clear Completed] button to delete all tasks
    TaskList.clearCompletedBtn.click();

    expect(TaskList.totalTasksCount()).toEqual(0);
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
