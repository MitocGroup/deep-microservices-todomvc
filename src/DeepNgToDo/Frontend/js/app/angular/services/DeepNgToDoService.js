'use strict';
'format es6';

import moduleName from '../name';

class DeepNgToDoService{

  constructor($q) {
    this.deepResource = DeepFramework.Kernel.container.get('resource');
    this.todoResource = this.deepResource.get('@deep.ng.todo:todo');
    this.$q = $q;
  }

  /**
   * @param todo
   * @returns {promise}
   */
  createTodo(todo) {
    var defer = this.$q.defer();
    var payload = {
      Title: todo,
      Status: 'Active',
    };

    this.todoResource.request('create', payload, 'POST').send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * @param todo
   * @returns {promise}
   */
  updateTodo(todo) {
    var defer = this.$q.defer();

    var payload = {
      Id: todo.Id,
      Title: todo.Title,
      Status: todo.Status,
    };

    this.todoResource.request('update', payload).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * @returns {promise}
   */
  retrieveAllTodos() {
    var defer = this.$q.defer();

    this.todoResource.request('retrieve', {}).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * @param todo
   * @returns {promise}
   */
  deleteTodo(todo) {
    var defer = this.$q.defer();

    var payload = {
      Id: todo.Id,
    };

    this.todoResource.request('delete', payload).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

}

DeepNgToDoService.$inject = [];

angular.module(moduleName).service('deepNgToDoService', ['$q', function($injector) {
  return new DeepNgToDoService($injector);
},]);
