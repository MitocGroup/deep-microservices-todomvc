/* global browser */
/* global protractor */
/* global element */
/* global by */

'use strict';

var config = require('../protractor.config.js');

var TaskList = function() {

  //Testing url from protractor.config.js
  this.url = config.config.testUrl;

  //Text field for creating new task
  this.taskInput = element(by.model('todoCtrl.title'));

  //"Check All" checkbox
  this.checkAll = element(by.css('.toggle-all'));

  //[All] button
  this.allBtn = element(by.linkText('All'));

  //General selector for checkboxes
  //this.checkBtnGeneral = element.all(by.css('.toggle'));
  this.checkBtnGeneral = element.all(by.model('todo.Completed'));

  //[Active] button
  this.activeBtn = element(by.linkText('Active'));

  //[Completed] button
  this.completedBtn = element(by.linkText('Completed'));

  //[Clear Completed] button
  this.clearCompletedBtn = element(by.css('.clear-completed'));

  //Delete buttons for tasks
  this.deleteBtn = element(by.css('.destroy'));

  //First task in the list
  this.firstTask = element.all(by.repeater('todo in todoList')).first();

  //Last task in the list
  this.lastTask = element(by.xpath('html/body/div/div/section/section/ul/li[last()]/div/label'));

  //Tasks names in the list
  this.taskNameGeneral = element.all(by.repeater('todo in todoList'));

  //Tasks count
  this.tasksCount = element(by.css('.todo-count'));

  //Task editing input
  this.editTask = element(by.css('.edit.ng-valid'));

  //Function returns the state of "Check All" checkbox (null if checkbox is unchecked, true if checkbox is checked)
  this.isCheckAllSelected = function() {
    return this.checkAll.getAttribute('checked');
  };

  //Function creates new ToDo task
  this.addTask = function(value) {
    //Inputting the task name into text field and pressing on enter button
    this.taskInput.sendKeys(value, protractor.Key.ENTER);

    //Waiting for new created task to appear on the page
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.lastTask, value), 20000);
  };

  //Function gets the number of tasks in the list
  this.totalTasksCount = function() {
    return this.taskNameGeneral.count();
  };

  //Function deletes all existing tasks
  this.clearAllTasks = function() {
    browser.sleep(10000);
    var _this = this;
    this.totalTasksCount()
      .then(function(number) {
        _this.isCheckAllSelected()
          .then(function(resultState) {
            if (number > 0) {
              //Checking if "Select All" checkbox is checked or not
              if (resultState == null) {
                //Clicking on the "Check all" checkbox
                _this.checkAll.click();
              }

              //Clicking on the "Clear completed" button to delete all completed tasks
              _this.clearCompletedBtn.click();

              //Verifying that "Check All" checkbox is checked
              expect(_this.checkAll.getAttribute('checked')).toEqual('true');

              //Clicking on the "Check All" checkbox
              _this.checkAll.click();
            }
          });
      });
  };

  //Function gets task count number
  this.itemsLeftNumber = function(countNumber) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(this.tasksCount));

    var message = countNumber === 1 ? ' item left' : ' items left';

    expect(this.tasksCount.getText()).toEqual(countNumber + message);
  };

  this.actionsBeforeAll = function() {
    //Opening ToDoApp
    browser.get(this.url);

    //Deleting all existing tasks
    this.clearAllTasks();
  };

  this.taskEditing = function(taskIndex, editedValue) {
    //Double click on the task to make it editable
    browser.actions().doubleClick(this.taskNameGeneral.get(taskIndex)).perform();

    //Verifying that input is displayed
    expect(this.editTask.isDisplayed()).toEqual(true);

    //Removing previous task name from input
    this.editTask.clear();

    //Adding new value into input and pressing "enter" button
    this.editTask.sendKeys(editedValue, protractor.Key.ENTER);

    //Waiting until new task is actually created and displayed
    browser.wait(
      protractor.ExpectedConditions.textToBePresentInElement(this.taskNameGeneral.get(taskIndex), editedValue),
      10000
    );

    //Verifying that new value is saved
    expect(element(by.css('.todo-list')).getText()).toEqual(editedValue);
  };
};

module.exports = new TaskList();
