'use strict';
'format es6';

import moduleName from '../name';
import {AbstractManager} from './AbstractManager';

class DeepNgToDoService extends AbstractManager {

  constructor($q) {
    super($q);
    this.deepResource = DeepFramework.Kernel.container.get('resource');
    this.todoResource = this.deepResource.get('@deep.ng.todo:todo');
  }

  /**
   * @param todo
   * @returns {promise}
   */
  createTodo(todo) {
    var deferred = this.newDefer;
    var payload = {
      Title: todo,
      Status: 'All',
    };

    this.todoResource.request('create', payload, 'POST').send((response) => {
      deferred = this.handleResponse(response);
    });

    return deferred.promise;
  }

  /**
   * @return {promise}
  */
  updateTodo(todo) {
    var deferred = this.newDefer;

    var payload = {
      Id: todo.Id,
      fields: {
        Title: todo.Title,
        Status: todo.Status,
      },
    };

    console.log(payload);
    this.todoResource.request('update', payload).send((response) => {
      deferred = this.handleResponse(response);
    });

    return deferred.promise;
  }

  /**
   * @returns {promise}
   */
  retrieveAllTodos() {
    var deferred = this.newDefer;

    this.todoResource.request('retrieve', {}).send((response) => {
      deferred = this.handleResponse(response);
    });

    return deferred.promise;
  }

  /**
   * @return {promise}
   */
  deleteTodo(todo) {
    var deferred = this.newDefer;

    var payload = {
      Id: todo.Id,
    };

    this.todoResource.request('delete', payload).send((response) => {
      deferred = this.handleResponse(response);
    });

    return deferred.promise;
  }

}

DeepNgToDoService.$inject = [];

angular.module(moduleName).service('deepNgToDoService', ['$q', function($injector) {
  return new DeepNgToDoService($injector);
},]);
