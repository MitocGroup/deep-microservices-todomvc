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
    let todoItems = request.data;

    if (!Array.isArray(todoItems)) {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(todoItems, 'array');
    }

    let TodoModel= this.kernel.get('db').get('Todo');
    let updatedCount = 0;

    if (!todoItems.length) {
      return this.createResponse({}).send();
    }

    todoItems.forEach((todo) => {
      if (typeof todo !== 'object') {
        throw new DeepFramework.Core.Exception.InvalidArgumentException(todo, 'object');
      }

      if (typeof todo.Id !== 'string') {
        throw new InvalidArgumentException(todo.Id, 'string');
      }

      TodoModel.updateItem(todo.Id, todo, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (todoItems.length == ++updatedCount) {
          return this.createResponse({}).send();
        }
      });
    });
  }
}
