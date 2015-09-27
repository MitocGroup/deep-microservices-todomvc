'use strict';
'format es6';

import moduleName from '../name';

class DeepNgToDoController {

  constructor(deepNgToDoService) {
    this._deepNgToDoService = deepNgToDoService;

    this.editedTodo = null;
  }

  get deepNgToDoService() {
    return this._deepNgToDoService;
  }

  editTodo(todo) {
    this.editedTodo = todo;
    this.originalTodo = angular.extend({}, todo);
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

    return this._deepNgToDoService.editTodoMVC(todo);

  }

  revertEdits(todo) {
    this.editedTodo = null;
    this.originalTodo = null;
    this.reverted = true;
  }

  //toggleCompleted(todo, completed) {
  //  if(angular.isDefined(completed)) {
  //    todo.completed = completed;
  //  }
  //  todo.completed = !todo.completed;
  //}
  //
  //markAll(completed) {
  //  this._deepNgToDoService._todoList.foreach(function (todo) {
  //    if (todo.completed !== completed) {
  //      this.toggleCompleted(todo, completed);
  //    }
  //  })
  //}

}

DeepNgToDoController.$inject = ['deepNgToDoService'];

angular.module(moduleName).controller('DeepNgToDoController', DeepNgToDoController);
