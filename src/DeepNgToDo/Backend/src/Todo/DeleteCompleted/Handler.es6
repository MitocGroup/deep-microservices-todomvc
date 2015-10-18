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

    let deletedCount = 0;

    // Validate given ids
    for (let id of request.data) {
      if (!id || typeof id !== 'string') {
        throw new frameworkException.InvalidArgumentException(id, 'string');
      }

      this.deleteTodo(id, (err) => {
        if (err) {
          throw new frameworkException.DatabaseOperationException(err);
        }

        if (request.data.length == ++deletedCount) {
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
