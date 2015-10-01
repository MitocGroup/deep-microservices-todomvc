'use strict';
'format es6';

import moduleName from '../name';

class DeepNgToDoController {

  constructor(deepNgToDoService) {
    this._deepNgToDoService = deepNgToDoService;
    this.todoTitle = '';
    this.todoList = [];
    this.editedTodo = null;

    /**
     * @returns {Object}
     */
    this.deepNgToDoService.retrieveAllTodos()
      .then((response) => {
        this.todoList = response;
        console.log(this.todoList);
      })
      .catch((reason) => {}
    );
  }


  /**
   * @returns {Array}
   */
  get deepNgToDoService() {
    return this._deepNgToDoService;
  }

  /**
   * Returns true if tasks exist
   */
  get hasTasks() {
    return this.todoList.length;
  }

  /**
   * Returns active tasks count
   */
  get tasksNumber() {
    let remainingCount = 0, todo;
    for (todo = 0; todo < this.todoList.length; todo++) {
      if (!this.todoList[todo].Completed){
        remainingCount++;
      }
    }
    return remainingCount;
  }

  /**
   * Returns completed tasks count
   */
  get completedCount() {
    return this.todoList.length - this.tasksNumber;
  }

  /**
   * Create a new task
   */
  createToDo() {
    this.deepNgToDoService.createTodo(this.todoTitle)
      .then((response) => {
        this.todoList.push(response);
        this.todoTitle = '';
      })
      .catch((reason) => {}
    );
  }

  /**
   * Edit a task
   * @param todo
   * @param event
   */
  saveEdits(todo, event) {

    if (event === 'blur' && this.saveEvent === 'submit') {
      this.saveEvent = null;
      return;
    }

    this.saveEvent = event;

    if (this.reverted) {
      this.reverted = null;
      return;
    }

    if (todo.Title === this.originalTodo.Title) {
      this.editedTodo = null;
      return;
    }

    this.deepNgToDoService.updateTodo(todo)
      .then(() => {
        this.editedTodo = null;
      })
      .catch(() => {
        todo.Title = $scope.originalTodo.Title;
      }
    );
  }

  /**
   * Delete a task
   * @param todo
   */
  deleteToDo(todo) {
    this.deepNgToDoService.deleteTodo(todo)
      .then(() => {
        let index = this.todoList.indexOf(todo);
        this.todoList.splice(index, 1);
      },
      (reason) => {});
  }

  /**
   * Clone the original todo to restore it on demand
   * @param todo
   */
  editTodo(todo) {
    this.editedTodo = todo;
    this.originalTodo = angular.extend({}, todo);
  }

  /**
   * Complete task
   * @param todo
   * @param completed
   */
  toggleCompleted(todo, completed) {
    if (angular.isDefined(completed)) {
      todo.Completed = completed;
    }
    this.deepNgToDoService.updateTodo(todo)
      .then(() => {})
      .catch(() => {
        todo.Completed = !todo.Completed;
      }
    );
  }

  /**
   * Revert editing task
   * @param todo
   */
  revertEdits(todo) {
    this.editedTodo = null;
    this.originalTodo = null;
    this.reverted = true;
  }

  /**
   * Mark all tasks as completed
   * @param completed
   */
  markAll(completed) {
    let todo;
    for (todo = 0; todo < this.todoList.length; todo++) {
      if (this.todoList[todo].Completed !== completed) {
        this.toggleCompleted(this.todoList[todo], completed);
      }
    }
  }

  /**
   * Delete all completed tasks
   */
  deleteCompleted() {
    let todo;
    for (todo = this.todoList.length - 1; todo >= 0; todo -= 1) {
      if (this.todoList[todo].Completed) {
        this.deleteToDo(this.todoList[todo]);
      }
    }
  }

}

DeepNgToDoController.$inject = ['deepNgToDoService'];

angular.module(moduleName).controller('DeepNgToDoController', DeepNgToDoController);


