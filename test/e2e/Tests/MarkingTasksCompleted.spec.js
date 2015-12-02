/* global browser */
/* global protractor */

'use strict';

var TaskList = require('../POMs/TasksList.js');

describe('Verify that clicking on checkbox makes task completed', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(TaskList.url);

    //Deleting all existing tasks
    TaskList.clearAllTasks();
  });

  it('Validating that clicking on checkbox makes task completed', function() {
    //Creating two new tasks
    TaskList.addTask('first test task');
    TaskList.addTask('second test task');

    //Verifying that tasks count is equal to 2
    TaskList.itemsLeftNumber(2);

    //Clicking on the [Check] button for the first task (this makes it completed)
    TaskList.checkBtnGeneral.get(0).click();

    //Verifying that tasks count became equal to 1
    TaskList.itemsLeftNumber(1);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
