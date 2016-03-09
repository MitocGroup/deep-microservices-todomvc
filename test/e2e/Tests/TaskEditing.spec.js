'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Check that task name can be updated', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Adding new task', function() {
    TaskList.addTask('protractor test task1');
  });

  it('Updating the task name and verifying that it is saved', function() {
    TaskList.taskEditing(0, 'updated task name');
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});

