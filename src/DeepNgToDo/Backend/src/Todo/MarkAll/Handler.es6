'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);

    this.todoTable = this._kernel.get('db').get('Todo');
  }

  handle(request) {
    let frameworkException = DeepFramework.Core.Exception;
    let data = request.data;

    if (!Array.isArray(data)) {
      throw new frameworkException.InvalidArgumentException(request.data, 'array');
    }

    if (!data.length) {
      return this.createResponse({}).send();
    }

    let updatedCount = 0;

    for (let index in data) {
      if (!data.hasOwnProperty(index)) {
        continue;
      }
      let todo = data[index];

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
    if (!todo.Id || typeof todo.Id !== 'string') {
      throw new InvalidArgumentException(todo.Id, 'string');
    }

    this.todoTable.updateItem(todo.Id, todo, (err) => {
      callback(err);
    });
  }
}
