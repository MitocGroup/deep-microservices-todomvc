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

    //Clicking on the first task's checkbox, it will make it completed
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that [Clear Completed] button becomes displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(true);

    //Clicking on the first task's checkbox again, it will the task active again
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that [Clear Completed] button becomes not displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(false);

    //Clicking on the "Select All" checkbox, it will make all tasks completed
    TaskList.checkAll.click();

    //Verifying that there are 2 tasks displayed before deleting
    expect(TaskList.totalTasksCount()).toEqual(2);

    //Verify that [Clear Completed] button becomes displayed
    expect(TaskList.clearCompletedBtn.isDisplayed()).toEqual(true);

    //Clicking on [Clear Completed] button to delete all tasks
    TaskList.clearCompletedBtn.click();

    //Verifying that there are no tasks displayed after deleting
    expect(TaskList.totalTasksCount()).toEqual(0);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});
