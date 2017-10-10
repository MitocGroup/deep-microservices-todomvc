'use strict';
'format es6';

/* global DeepFramework */
/* global angular */

import moduleName from '../name';

class DeepTodoService {

  /**
   * @param {Object} $q
   */
  constructor($q) {
    this.todoResource = DeepFramework.Kernel.container.get('resource').get('@deep-todomvc:task');
    this.$q = $q;
    this.todoList = [];
    this.editedTask = null;
    this.allChecked = false;
  }

  /**
   * @param title
   * @returns {promise|boolean}
   */
  createTask(title) {
    let defer = this.$q.defer();
    let newTask = {
      Title: title.trim(),
      Completed: false
    };

    this.todoList.push(newTask);
    this.todoResource.request('create', Object.assign({}, newTask), 'POST').send((response) => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        newTask = Object.assign(response.data, newTask);
        defer.resolve(newTask);
      }
    });

    newTask.__promise = defer.promise;

    return newTask.__promise;
  }

  /**
   * @param todo
   * @returns {promise}
   */
  updateTask(todo) {
    let defer = this.$q.defer();

    this.waitFor(todo).then(todo => {
      this.todoResource.request('update', todo).send((response) => {
        this.editedTask = null;
        if (response.isError) {
          defer.reject(response.error);
        } else {
          defer.resolve(response.data);
        }
      });

      return defer.promise;
    });

    return defer.promise;
  }

  fetchAllTasks() {
    let defer = this.$q.defer();
    this.todoResource.request('retrieve', {}).send(response => {
      if (response.isError) {
        defer.reject(response.error);
      } else {
        this.todoList = this.todoList.concat(response.data);
        defer.resolve(response.data);
      }
    });

    return defer.promise;
  }

  /**
   * @param todo
   * @returns {promise}
   */
  deleteTask(todo) {
    let defer = this.$q.defer();
    let index = this.todoList.indexOf(todo);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }

    this.waitFor(todo).then(todo => {
      this.todoResource.request('delete', { Id: todo.Id }).send((response) => {
        if (response.isError) {
          defer.reject(response.error);
        } else {
          defer.resolve(response.data);
        }
      });

      return defer.promise;
    });
  }

  /**
   * Send the last state of mark all
   * @param {boolean} state
   */
  markAllSend(state) {
    let defer = this.$q.defer();
    let updatedList = [];

    for (let todo of this.todoList) {
      if (todo.Completed === state) {
        todo.Completed = state;
      }
      updatedList.push(todo);
    }

    this.waitForAll(updatedList).then(updatedList => {
      this.todoResource.request('markAll', updatedList).send((response) => {
        if (response.isError) {
          defer.reject(response.error);
        } else {
          defer.resolve(response.data);
        }
      });
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
    let defer = this.$q.defer();
    var todoList = this.todoList.slice(0); // clone array
    let deleteStack = [];

    for (let todo of todoList) {
      if (todo.Completed) {
        deleteStack.push(todo);
        let index = this.todoList.indexOf(todo);
        if (index > -1) {
          this.todoList.splice(index, 1);
        }
      }
    }

    this.waitForAll(deleteStack).then(deleteStack => {
      this.todoResource.request('deleteCompleted', deleteStack).send((response) => {
        if (response.isError) {
          defer.reject(response.error);
        } else {
          defer.resolve(response.data);
        }
      });
    });

    return defer.promise;
  }

  /**
   * Clone the original todo to restore it on demand
   * @param {Object} todo
   */
  editTask(todo) {
    this.editedTask = todo;
    this.originalTask = angular.extend({}, todo);
  }

  isEditing(todo) {
    return this.editedTask && todo && this.editedTask.Id === todo.Id;
  }

  /**
   * @param {Object} todo
   * @returns {Object}
   */
  todoNgClass(todo) {
    return {
      completed: todo.Completed,
      editing: this.isEditing(todo)
    };
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

    this.updateTask(todo)
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
    this.todoList[this.todoList.indexOf(todo)] = this.originalTask;
    this.editedTask = null;
    this.originalTask = null;
    this.reverted = true;
  }

  /**
   * @param {Object} task
   * @returns {Promise}
   */
  waitFor(task) {
    return (task.__promise || Promise.resolve(task)).then(task => {
      delete task.__promise; // fixes JSON.stringify issue

      return task;
    });
  }

  /**
   * @param {Object[]} list
   * @returns {Promise}
   */
  waitForAll(list) {
    list = list || this.todoList;

    return Promise.all(list.map(this.waitFor.bind(this)));
  }
}

angular.module(moduleName).service('deepTodoService',
  ['$q', (...args) => {
    return new DeepTodoService(...args);
  }]
);
