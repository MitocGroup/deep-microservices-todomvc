/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that tasks count decreases after creating new tasks', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Verify that tasks count decreases after creating new tasks', function() {
    //Adding new task
    TaskList.addTask('protractor test task1');

    //Verify that count is "1"
    TaskList.tasksCountNumber(1);

    //Adding one more task
    TaskList.addTask('protractor test task2');

    //Verify that count is "2"
    TaskList.tasksCountNumber(2);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
