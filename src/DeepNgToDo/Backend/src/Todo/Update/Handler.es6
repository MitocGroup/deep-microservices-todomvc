'use strict';

import DeepFramework from 'deep-framework';

export default class Handler extends DeepFramework.Core.AWS.Lambda.Runtime {

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
    let todoId = request.getParam('Id');

    if (typeof todoId !== 'string') {
      throw new InvalidArgumentException(todoId, 'string');
    }

    let TodoModel = this.kernel.get('db').get('Todo');

    TodoModel.updateItem(todoId, request.data, (err, todo) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(todo.get()).send();
    });
  }
}
