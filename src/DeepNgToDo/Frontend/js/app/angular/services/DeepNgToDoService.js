'use strict';
'format es6';

import moduleName from '../name';

class DeepNgToDoService {

  constructor($q) {
    this.todoResource = DeepFramework.Kernel.container.get('resource').get('@deep.ng.todo:todo');
    this.$q = $q;
    this.todoList = [];
    this.editedTodo = null;
    this.allChecked = false;

    this._ready = $q.defer();
    this.anonymousLogin().then(() => {
      this._ready.resolve();
    });
  }

  get ready() {
    return this._ready.promise;
  }

  /**
   *@return {promise}
   */
  anonymousLogin() {
    let deferred = this.$q.defer();
    let deepSecurity = DeepFramework.Kernel.container.get('security');

    deepSecurity.anonymousLogin((token) => {
      deferred.resolve(token);
    });

    return deferred.promise;
  }

  /**
   * @param title
   * @returns {promise}
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
  get hasTasks() {
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
    this.todoList.splice(index, 1);

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
   * Mark all tasks as completed
   * @param state
   */
  markAll(state) {
    for (let todo of this.todoList) {
      if (todo.Completed !== state) {
        this.toggleCompleted(todo, state);
      }
    }
  }

  /**
   * Delete all completed tasks
   */
  deleteCompleted() {
    for (let todo of this.todoList) {
      if (todo.Completed) {
        this.deleteTodo(todo);
      }
    }
  }

  /**
   * Returns active tasks count
   */
  get tasksNumber() {
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
   */
  get completedCount() {
    return this.todoList.length - this.tasksNumber;
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
   * @param todo
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
