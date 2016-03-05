'use strict';
'format es6';

/* global DeepFramework */
/* global angular */

import moduleName from '../name';

class DeepTodoController {

  /**
   * @param $scope
   * @param $filter
   * @param {DeepTodoService} deepTodoService
   * @param {DeepLoginService} deepLoginService
   */
  constructor($scope, $filter, deepTodoService, deepLoginService) {
    this.deepLog = DeepFramework.Kernel.container.get('log');
    $scope.todoService = deepTodoService;
    this.todoService = deepTodoService;
    $scope.todoList = deepTodoService.todoList;

    $scope.$watch(() => { return deepTodoService.todoList; }, () => {
      $scope.todoList = deepTodoService.todoList;
      $scope.remainingCount = $filter('filter')($scope.todoList, { Completed: false }).length;
      $scope.completedCount = $scope.todoList.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount && $scope.todoList.length > 0;
    }, true);

    this.throttledToggleCompleted = _.debounce((todo, completed) => {
      this.todoService.toggleCompleted(todo, completed);
    }, 200);

    this.throttledMarkAll = _.debounce((state) => {
      this.todoService.markAllSend(state);
    }, 400);

    deepLoginService.anonymousLogin().then(() => {
      deepTodoService.fetchAllTodo().catch((error) => {
        this.deepLog.log(error);
      });
    });
  }

  create() {
    let title = this.title.trim();
    if (title) {
      this.saving = true;
      this.todoService.createTask(title)
        .catch((error) => {
          this.deepLog.log(error);
        })
        .finally(() => {
          this.title = '';
          this.saving = false;
        }
      );
    }
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

    if (this.todoService.reverted) {
      this.todoService.reverted = null;
      return;
    }

    todo.Title = todo.Title.trim();

    if (todo.Title === "") {
      this.delete(todo);
    }

    if (this.todoService.originalTask && todo.Title === this.todoService.originalTask.Title) {
      this.todoService.editedTask = null;
      return;
    }

    this.todoService.updateTask(todo).catch((error) => {
      this.deepLog.log(error);
    });
  }

  /**
   *
   * @param {Object} todo
   */
  delete(todo) {
    this.todoService.deleteTask(todo);
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
    this.todoService.markAll(state);
    this.throttledMarkAll(state);
  }
}

angular.module(moduleName).controller('DeepTodoController',
  ['$scope', '$filter', 'deepTodoService', 'deepLoginService', (...args) => {
    return new DeepTodoController(...args);
  },]

);