var TaskList = require('../POMs/TasksList.js');

describe('Check that tasks count decreases after marking tasks completed', function () {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Verify that tasks count decreases after marking tasks completed', function () {
    //Adding two new task
    let timestamp = new Date();
    let firstTaskName = 'test task name ' + timestamp.toString;
    let secondTaskName = 'test task name ' + timestamp.toString;

    TaskList.addTask(firstTaskName);
    TaskList.addTask(secondTaskName);

    //Verify that count is "2"
    TaskList.tasksCountNumber(2);

    //Clicking on checkbox for the first task, it will make it completed
    TaskList.checkBtnGeneral.get(0).click();

    //Verify that count becomes "1"
    TaskList.tasksCountNumber(1);

    //Clicking on checkbox for the second task, it will make it completed
    TaskList.checkBtnGeneral.get(1).click();

    //Verify that count becomes "0"
    TaskList.tasksCountNumber(0);
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});


