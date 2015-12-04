'use strict';
'format es6';

/* global DeepFramework */
/* global angular */

import moduleName from '../name';

class DeepNgToDoController {

  /**
   * @param $scope
   * @param $filter
   * @param {DeepNgToDoService} deepNgToDoService
   * @param {DeepNgLoginService} deepNgLoginService
   */
  constructor($scope, $filter, deepNgToDoService, deepNgLoginService) {
    this.deepLog = DeepFramework.Kernel.container.get('log');
    $scope.toDoService = deepNgToDoService;
    this.toDoService = deepNgToDoService;
    $scope.todoList = deepNgToDoService.todoList;

    $scope.$watch(() => { return deepNgToDoService.todoList }, () => {
      $scope.todoList = deepNgToDoService.todoList;
      $scope.remainingCount = $filter('filter')($scope.todoList, { Completed: false }).length;
      $scope.completedCount = $scope.todoList.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    this.throttledToggleCompleted = _.debounce((todo, completed) => {
      this.toDoService.toggleCompleted(todo, completed);
    }, 200);

    this.throttledMarkAll = _.debounce((state) => {
      this.toDoService.markAllSend(state);
    }, 400);

    deepNgLoginService.anonymousLogin().then(() => {
      deepNgToDoService.fetchAllToDo().catch((error) => {
        this.deepLog.log(error);
      });
    });
  }

  create() {
    this.saving = true;
    this.toDoService.createToDo(this.title)
      .catch((error) => {
        this.deepLog.log(error);
      })
      .finally(() => {
        this.title = '';
        this.saving = false;
      }
    );
  }

  /**
   * @param {Object} todo
   * @param {string} event
   */
  update(todo, event) {
    if (event === 'blur' && this.prevEvent === 'submit') {
      this.prevEvent = null;
      return;
    }

    this.prevEvent = event;

    if (this.toDoService.reverted) {
      this.toDoService.reverted = null;
      return;
    }

    todo.Title = todo.Title.trim();

    if (todo.Title === "") {
      this.delete(todo);
    }

    if (this.toDoService.originalTodo && todo.Title === this.toDoService.originalTodo.Title) {
      this.toDoService.editedTodo = null;
      return;
    }

    this.toDoService.updateTodo(todo).catch((error) => {
      this.deepLog.log(error);
    });
  }

  /**
   *
   * @param {Object} todo
   */
  delete(todo) {
    this.toDoService.deleteTodo(todo);
  }

  /**
   * @param {Object} todo
   * @param {boolean} completed
   */
  toggleCompleted(todo, completed) {
    this.throttledToggleCompleted(todo, completed);
  }

  /**
   * @param {boolean} state
   */
  markAll(state) {
    this.toDoService.markAll(state);
    this.throttledMarkAll(state);
  }
}

angular.module(moduleName).controller('DeepNgToDoController',
  ['$scope', '$filter', 'deepNgToDoService', 'deepNgLoginService', (...args) => {
    return new DeepNgToDoController(...args);
  },]

);