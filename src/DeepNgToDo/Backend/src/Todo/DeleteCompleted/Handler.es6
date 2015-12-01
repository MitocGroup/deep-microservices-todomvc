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
      throw new frameworkException.InvalidArgumentException(data, 'array');
    }

    if (!data.length) {
      return this.createResponse({}).send();
    }

    let deletedCount = 0;

    // Validate given ids
    for (let index in data) {
      if (!data.hasOwnProperty(index)) {
        continue;
      }
      let id = data[index];

      if (!id || typeof id !== 'string') {
        throw new frameworkException.InvalidArgumentException(id, 'string');
      }

      this.deleteTodo(id, (err) => {
        if (err) {
          throw new frameworkException.DatabaseOperationException(err);
        }

        if (data.length == ++deletedCount) {
          return this.createResponse({}).send();
        }
      });
    }
  }

  /**
   * Delete Todo
   * @param {string} id
   * @param callback
   */
  deleteTodo(id, callback) {
    this.todoTable.deleteById(id, (err) => {
      callback(err);
    });
  }
}
