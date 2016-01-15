'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param request
   */
  handle(request) {
    let todoIds = request.data;

    if (!Array.isArray(todoIds)) {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(todoIds, 'array');
    }

    let TodoModel = this.kernel.get('db').get('Todo');
    let deletedCount = 0;

    if (!todoIds.length) {
      return this.createResponse({}).send();
    }

    todoIds.forEach((todoId) => {
      if (typeof todoId !== 'string') {
        throw new DeepFramework.Core.Exception.InvalidArgumentException(todoId, 'string');
      }

      TodoModel.deleteById(todoId, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (todoIds.length === ++deletedCount) {
          return this.createResponse({}).send();
        }
      });
    });
  }
}
