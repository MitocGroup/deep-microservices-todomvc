'use strict';
'format es6';

import moduleName from '../name';

class DeepNgToDoController {

  constructor($scope, deepNgToDoService) {
    $scope.toDoService = deepNgToDoService;
    this.toDoService = deepNgToDoService;

    this.saving = false;
    this.title = '';

    deepNgToDoService.ready.then(() => {
      deepNgToDoService.fetchAllToDo().catch((error) => {
        console.log(error);
      });
    });
  }

  create() {
    this.saving = true;
    this.toDoService.createToDo(this.title)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.title = '';
        this.saving = false;
      }
    );
  }

  update(todo, event) {
    if (event == 'blur' && this.prevEvent == 'submit') {
      this.prevEvent = null;
      return;
    }

    this.prevEvent = event;

    if (this.reverted) {
      this.reverted = null;
      return;
    }

    todo.Title = todo.Title.trim();

    if (this.toDoService.originalTodo && todo.Title == this.toDoService.originalTodo.Title) {
      this.toDoService.editedTodo = null;
      return;
    }

    this.toDoService.updateTodo(todo).catch((error) => {
      console.log(error);
    });
  }

  delete(todo) {
    this.toDoService.deleteTodo(todo);
  }
}

DeepNgToDoController.$inject = ['$scope', 'deepNgToDoService'];

angular.module(moduleName).controller('DeepNgToDoController', DeepNgToDoController);

