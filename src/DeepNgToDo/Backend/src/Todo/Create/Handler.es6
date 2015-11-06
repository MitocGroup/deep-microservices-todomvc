'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  handle(request) {
    this.createTodo(request.data, (err, todo) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(todo.get()).send();
    });
  }

  /**
   * Create todo
   * @param data
   * @param callback
   */
  createTodo(data, callback) {
    let TodoList = this._kernel.get('db').get('Todo');

    TodoList.createItem(data, (err, todo) => {
      callback(err, todo);
    });
  }
}
