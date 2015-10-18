'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);

    let deepDb = DeepFramework.Kernel.container.get('db');
    this.todoTable = deepDb.get('Todo');
  }

  handle(request) {
    let frameworkException = DeepFramework.Core.Exception;

    if (!Array.isArray(request.data)) {
      throw new frameworkException.InvalidArgumentException(request.data, 'array');
    }

    if (!request.data.length) {
      return this.createResponse({}).send();
    }

    let updatedCount = 0;

    for (let todo of request.data) {
      if (!todo || typeof todo !== 'object') {
        throw new frameworkException.InvalidArgumentException(todo, 'object');
      }

      this.updateTodo(todo, (err) => {
        if (err) {
          throw new frameworkException.DatabaseOperationException(err);
        }

        if (request.data.length == ++updatedCount) {
          return this.createResponse({}).send();
        }
      });
    }
  }

  /**
   * Update Todo
   * @param {Object} todo
   * @param {Function} callback
   */
  updateTodo(todo, callback) {
    console.log(todo.Id);
    if (!todo.Id || typeof todo.Id !== 'string') {
      throw new InvalidArgumentException(todo.Id, 'string');
    }

    this.todoTable.updateItem(todo.Id, todo, (err) => {
      callback(err);
    });
  }
}
