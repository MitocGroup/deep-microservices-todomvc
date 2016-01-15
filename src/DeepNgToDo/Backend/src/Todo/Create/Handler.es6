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
    let TodoModel = this.kernel.get('db').get('Todo');

    TodoModel.createItem(request.data, (err, todo) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(todo.get()).send();
    });
  }
}
