'use strict';
'format es6';

/* global DeepFramework */
/* global angular */

import moduleName from '../name';

class DeepNgToDoService {

  /**
   * @param {Object} $q
   */
  constructor($q) {
    this.todoResource = DeepFramework.Kernel.container.get('resource').get('@deep.ng.todo:todo');
    this.$q = $q;
    this.todoList = [];
    this.editedTodo = null;
    this.allChecked = false;
  }

  /**
   * @param title
   * @returns {promise|boolean}
   */
  createToDo(title) {
    let _this = this;
    let defer = this.$q.defer();

    if (!title) {
      return false;
    }

    let newTodo = {
      Title: title.trim(),
      Completed: false
    };

    this.todoResource.request('create', newTodo, 'POST').send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        _this.todoList.push(response.data);
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
    let defer = this.$q.defer();

    this.todoResource.request('update', todo).send((response) => {
      this.editedTodo = null;
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * Returns true if tasks exist
   */
  get hasTodo() {
    return this.todoList.length > 0;
  }

  fetchAllToDo() {
    let defer = this.$q.defer();
    let _this = this;

    this.todoResource.request('retrieve', {}).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        _this.todoList = response.data;
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
    let defer = this.$q.defer();

    let index = this.todoList.indexOf(todo);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }

    this.todoResource.request('delete', { Id: todo.Id }).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * Send the last state of mark all
   * @param {boolean} state
   */
  markAllSend(state) {
    let defer = this.$q.defer();
    let updatedList = [];

    for (let todo of this.todoList) {
      if (todo.Completed == state) {
        todo.Completed = state;
      }
      updatedList.push(todo);
    }

    this.todoResource.request('markAll', updatedList).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * Mark or unmark all tasks as completed
   * @param {boolean} state
   */
  markAll(state) {
    for (let todo of this.todoList) {
      if (todo.Completed !== state) {
        todo.Completed = state;
      }
    }
  }

  /**
   * Delete all completed tasks
   */
  deleteCompleted() {
    let ids = [];
    let defer = this.$q.defer();
    var todoList = this.todoList.slice(0); // clone array

    for (let todo of todoList) {
      if (todo.Completed) {
        ids.push(todo.Id);
        let index = this.todoList.indexOf(todo);
        if (index > -1) {
          this.todoList.splice(index, 1);
        }
      }
    }

    this.todoResource.request('deleteCompleted', ids).send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * Returns active tasks count
   * @returns {number}
   */
  get todoNumber() {
    let remainingCount = 0;

    for (let todo of this.todoList) {
      if (!todo.Completed) {
        remainingCount++;
      }
    }
    return remainingCount;
  }

  /**
   * Returns completed tasks count
   * @returns {number}
   */
  get completedCount() {
    return this.todoList.length - this.todoNumber;
  }

  /**
   * Clone the original todo to restore it on demand
   * @param {Object} todo
   */
  editTodo(todo) {
    this.editedTodo = todo;
    this.originalTodo = angular.extend({}, todo);
  }

  isEditing(todo) {
    return this.editedTodo && todo && this.editedTodo.Id === todo.Id;
  }

  /**
   * @param {Object} todo
   * @returns {Object}
   */
  todoNgClass(todo) {
    return {
      completed: todo.Completed,
      editing: this.isEditing(todo)
    }
  }

  /**
   * Complete task
   * @param {Object} todo
   * @param completed
   */
  toggleCompleted(todo, completed) {
    if (angular.isDefined(completed)) {
      todo.Completed = completed;
    }
    this.updateTodo(todo)
        .then(() => {})
        .catch(() => {
          todo.Completed = !todo.Completed;
        });
  }

  /**
   * Revert editing task
   * @param {Object} todo
   */
  revertEdits(todo) {
    this.todoList[this.todoList.indexOf(todo)] = this.originalTodo;
    this.editedTodo = null;
    this.originalTodo = null;
    this.reverted = true;
  }
}

angular.module(moduleName).service('deepNgToDoService', ['$q', (...args) => {
  return new DeepNgToDoService(...args);
},]);
