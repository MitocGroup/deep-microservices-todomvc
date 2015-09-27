'use strict';
'format es6';

import moduleName from '../name';

class DeepToService {

  constructor() {
    this._todoList = [];
  }

  get todoList() {
    return this._todoList;
  }

  addToDo() {
    this._todoList.push({
      title: this.title
    });
    this.title = '';
  }

  deleteToDo(item) {
    let index = this._todoList.indexOf(item);
    this._todoList.splice(index, 1);
  }

  editTodoMVC(todo) {
    this._todoList.title = todo;
  }

}

DeepToService.$inject = [];

angular.module(moduleName).service('deepToDoService', DeepToService);
