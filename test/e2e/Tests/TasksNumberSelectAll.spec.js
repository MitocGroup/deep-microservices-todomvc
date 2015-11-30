/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that tasks count updates after clicking on "Select All" checkbox', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Verify that tasks count updates after clicking on "Select All" checkbox', function() {
    //Adding two new task
    TaskList.addTask('protractor test task1');
    TaskList.addTask('protractor test task2');

    //Verify that count is "2"
    TaskList.tasksCountNumber(2);

    //Clicking on the "Select All" checkbox, it will make all tasks completed
    TaskList.checkAll.click();

    //Verify that count becomes "0"
    TaskList.tasksCountNumber(0);

    //Clicking on the "Select All" checkbox again, it will make all tasks active again
    TaskList.checkAll.click();

    //Verify that count becomes "2"
    TaskList.tasksCountNumber(2);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
