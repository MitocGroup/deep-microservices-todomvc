var TaskList = function () {
  //Url link for testing
  this.url = 'http://todo.deep.mg';
  //Text field for creating new task
  this.taskInput = element(by.model('todoCtrl.title'));
  //"Check All" checkbox
  this.checkAll = element(by.css('.toggle-all'));
  //[All] button
  this.allBtn = element(by.linkText('All'));
  //General selector for checked checkboxes
  this.checkBtnGeneral = element.all(by.css('.toggle'));
  //[Active] button
  this.activeBtn = element(by.linkText('Active'));
  //[Completed] button
  this.completedBtn = element(by.linkText('Completed'));
  //[Clear Completed] button
  this.clearCompletedBtn = element(by.css('.clear-completed'));
  //First task in the list
  this.firstTask = element(by.xpath('html/body/div/section/section/ul/li[1]/div/label'));
  //Last task in the list
  this.lastTask = element(by.xpath('html/body/div/section/section/ul/li[last()]/div/label'));
  //Tasks names in the list
  this.taskNameGeneral = element.all(by.css('.todo-list li'));

  //Function returns the state of "Check All" checkbox (null if checkbox is unchecked, true if checkbox is checked)
  this.isCheckAllSelected = function () {
    return this.checkAll.getAttribute('checked');
  };

  //Function creates new ToDo task
  this.addTask = function (value) {
    //Inputting the task name into text field and pressing on enter button
    this.taskInput.sendKeys(value, protractor.Key.ENTER);
    //Waiting for new created task to appear on the page
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.lastTask, value))
  };

  //Function gets the number of tasks in the list
  this.totalTasksCount = function () {
    return this.taskNameGeneral.count();
  };

  this.clearAllTasks = function () {
    browser.sleep(10000);
    var self = this;
    this.totalTasksCount()
      .then(function (number) {
        //Checking if there are tasks in the list
        if (number > 0) {
          expect(self.checkAll.isDisplayed()).toEqual(true);
          //Checking if "Select All" checkbox is checked or not
          if (self.isCheckAllSelected == 'true') {
            //Clicking on the "Clear completed" button to delete all completed tasks
            self.clearCompletedBtn.click();
            //Verifying that "Check All" checkbox is checked
            expect(self.checkAll.getAttribute('checked')).toEqual('true');
            //Clicking on the "Check all" checkbox
            self.checkAll.click();
          } else {
            //Clicking on the "Check all" checkbox
            self.checkAll.click();
            //Clicking on the "Clear completed" button to delete all completed tasks
            self.clearCompletedBtn.click();
            //Verifying that "Check All" checkbox is checked
            expect(self.checkAll.getAttribute('checked')).toEqual('true');
            //Clicking on the "Check All" checkbox
            self.checkAll.click();
          }
        }
      });
  };

  this.clearCompleted = function () {
    //Waiting for the [All] button to become displayed
    browser.wait(protractor.ExpectedConditions.visibilityOf(this.allBtn));
    //Clicking on the "Check all" checkbox to make all tasks completed
    this.checkAll.click();
    //Verifying that all tasks are marked completed
    expect(this.checkedBoxesGeneral.count()).toEqual(this.totalTasksCount());
    //Clicking on the "Clear completed" button to delete all completed tasks
    this.clearCompletedBtn.click();
    //Clicking on the "Check all" checkbox
    this.checkAll.click();
  };
};

module.exports = new TaskList();