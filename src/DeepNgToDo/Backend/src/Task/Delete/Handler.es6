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
    let todoId = request.getParam('Id');

    if (typeof todoId !== 'string') {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(todoId, 'string');
    }

    let TodoModel = this.kernel.get('db').get('Todo');

    TodoModel.deleteById(todoId, (err) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse({}).send();
    });
  }
}
