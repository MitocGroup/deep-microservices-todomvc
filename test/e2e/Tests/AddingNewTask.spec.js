/* global browser */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that new task can be successfully added', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(TaskList.url);

    //Deleting all existing tasks
    TaskList.clearAllTasks();
  });

  it('Adding new task and validating that task is added', function() {
    TaskList.addTask('protractor test task');
  });

  afterAll(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
