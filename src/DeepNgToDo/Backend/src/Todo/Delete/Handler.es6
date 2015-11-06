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
    if (!request.data.Id || typeof request.data.Id !== 'string') {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(request.data.Id, 'string');
    }

    this.deleteTodo(request.data, (err) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse({}).send();
    });
  }

  /**
   * Delete Todo
   * @param data
   * @param callback
   */
  deleteTodo(data, callback) {
    let Todo = this._kernel.get('db').get('Todo');

    Todo.deleteById(data.Id, (err) => {
      callback(err);
    });
  }
}
