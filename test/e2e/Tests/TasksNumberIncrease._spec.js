'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that tasks count increases after creating new tasks', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Create the first task and verify that count is 1', function() {
    TaskList.addTask('first test task');

    TaskList.itemsLeftNumber(1);
  });

  it('Create the second task and verify that count is 2', function() {
    TaskList.addTask('second test task', true);

    TaskList.itemsLeftNumber(2);
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
