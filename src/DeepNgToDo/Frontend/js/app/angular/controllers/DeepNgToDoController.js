'use strict';
'format es6';

import moduleName from '../name';

class DeepNgToDoController {

  constructor(deepNgToDoService) {
    this._deepNgToDoService = deepNgToDoService;
    this.todoTitle = '';
    this.todoList = [];

    this.editedTodo = null;

    this.deepNgToDoService.retrieveAllTodos()
      .then((response) => {
        this.todoList = response;
      })
      .catch((reason) => {}
    );
  }

  get deepNgToDoService() {
    return this._deepNgToDoService;
  }

  createToDo() {
    this.deepNgToDoService.createTodo(this.todoTitle)
      .then((response) => {
        this.todoList.push(response);
        this.todoTitle = '';
      })
      .catch((reason) => {}
    );
  }

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
      .catch((reason) => {}
    );
  }

  deleteToDo(todo) {
    this.deepNgToDoService.deleteTodo(todo)
      .then(() => {
        let index = this.todoList.indexOf(todo);
        this.todoList.splice(index, 1);
      },
      (reason) => {});
  }


  editTodo(todo) {
    this.editedTodo = todo;
    this.originalTodo = angular.extend({}, todo);
  }

  revertEdits(todo) {
    this.editedTodo = null;
    this.originalTodo = null;
    this.reverted = true;
  }

  markAll(completed) {
    let todos = this.todoList;
    todos.forEach(function (todo) {
      if (todo.completed !== completed) {
        todo.completed = !todo.completed;
      }
    });
  }


}

DeepNgToDoController.$inject = ['deepNgToDoService'];

angular.module(moduleName).controller('DeepNgToDoController', DeepNgToDoController);


