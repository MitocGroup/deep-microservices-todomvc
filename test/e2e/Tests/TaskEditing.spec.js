var TaskList = require('../POMs/TasksList.js');

describe('Check that task name can be updated', function() {

  beforeAll(function() {
    TaskList.actionsBeforeAll();
  });

  it('Verify that task name can be updated', function() {
    //Adding new task
    TaskList.addTask('protractor test task1');

    //Editing the task name
    TaskList.taskEditing(0, 'updated task name');
  });

  afterEach(function() {
    //Deleting all existing tasks before each spec to avoid conflicts
    TaskList.clearAllTasks();
  });

});

