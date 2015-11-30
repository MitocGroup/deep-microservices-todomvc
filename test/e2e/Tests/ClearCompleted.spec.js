/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that [Clear Completed] button appears if at least one task is completed', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Verify that [Clear Completed] button appears if at least one task is completed', function() {
    //Adding two new task
    TaskList.addTask('protractor test task1');
    TaskList.addTask('protractor test task2');

    //Verify that [Clear Completed] button is not displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(false);

    //Clicking on the "Select All" checkbox, it will make all tasks completed
    TaskList.checkAll.click();

    //Verify that [Clear Completed] button becomes displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(true);

    //Clicking on the "Select All" checkbox again, it will make all tasks active again
    TaskList.checkAll.click();

    //Verify that [Clear Completed] button becomes not displayed again
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(false);

    //Clicking on the first task's checkbox, it will make it completed
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that [Clear Completed] button becomes displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(true);

    //Clicking on the first task's checkbox again, it will the task active again
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that [Clear Completed] button becomes not displayed again
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(false);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
