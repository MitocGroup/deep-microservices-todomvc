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

  get itemsNumber() {
    let remainingCount = 0, todo;
    for (todo = 0; todo < this.todoList.length; todo++) {
      if (this.todoList[todo].Status !== 'Completed'){
        remainingCount++;
      }
    }
    return remainingCount;
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
      .then((response) => {
        this.editedTodo = null;
      })
      .catch((reason) => {
        todo.title = $scope.originalTodo.title;
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
   */
  toggleCompleted(todo) {
    if (todo.Status === 'Active') {
      todo.Status = 'Completed';
      todo.completed = false;
    } else {
      todo.Status = 'Active';
      todo.completed = true;
    }
    this.deepNgToDoService.updateTodo(todo)
      .then((response) => {
        console.log(response);
        console.log(this.todoList);
        todo.completed = !todo.completed;
      })
      .catch((reason) => {}
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
    let todos = this.todoList;
    todos.forEach(function (todo) {
      if (todo.completed !== completed) {
        todo.completed = !todo.completed;
      }
    });
  }

  /**
   * Delete all completed tasks
   */
  deleteCompleted() {
    let todo;
    for (todo = this.todoList.length - 1; todo >= 0; todo -= 1) {
      if (this.todoList[todo].Status === 'Completed') {
        this.deleteToDo(this.todoList[todo]);
      }
    }
  }

}

DeepNgToDoController.$inject = ['deepNgToDoService'];

angular.module(moduleName).controller('DeepNgToDoController', DeepNgToDoController);


