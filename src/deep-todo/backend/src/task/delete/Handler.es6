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
    let taskId = request.getParam('Id');

    if (typeof taskId !== 'string') {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(taskId, 'string');
    }

    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.deleteById(taskId, (err) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse({}).send();
    });
  }
}
