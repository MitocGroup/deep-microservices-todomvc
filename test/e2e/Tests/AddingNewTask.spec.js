/* global browser */

'use strict';

var taskList = require('../POMs/TasksList.js');

describe('Verify that new task can be successfully added', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(taskList.url);
    //Deleting all existing tasks
    taskList.clearAllTasks();
  });

  it('Adding new task and validating that task is added', function() {
    //Adding new task
    taskList.addTask('protractor test task');
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    taskList.clearAllTasks();
  });

});
