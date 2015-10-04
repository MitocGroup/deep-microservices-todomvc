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
    this.createTodo(request.data, (err, todos) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(todos.get()).send();
    });
  }

  /**
   * Create todo
   * @param data
   * @param callback
   */
  createTodo(data, callback) {
    let deepDb = DeepFramework.Kernel.container.get('db');
    let TodoList = deepDb.get('Todos');

    TodoList.createItem(data, (err, todos) => {
      callback(err, todos);
    });
  }
}
