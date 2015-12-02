var TaskList = require('../POMs/TasksList.js');

describe('Check that task deletes if it is empty during updating', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Verify that task deletes if it is empty during updating', function() {
    //Adding new task
    TaskList.addTask('firstTaskName');
    TaskList.addTask('secondTaskName');

    //Verifying that there are 2 tasks displayed
    expect(TaskList.totalTasksCount()).toEqual(2);

    //Double click on the task to make it editable
    browser.actions().doubleClick(TaskList.taskNameGeneral.get(0)).perform();

    //Removing previous task name from input
    TaskList.editTask.clear();

    //Pressing "enter" button
    TaskList.editTask.sendKeys(protractor.Key.ENTER);

    //Verifying that there is 1 task displayed
    expect(TaskList.totalTasksCount()).toEqual(1);

    //Verifying that proper task is displayed (the one which was not deleted)
    expect(TaskList.taskNameGeneral.get(0).getText()).toEqual('secondTaskName');
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});

