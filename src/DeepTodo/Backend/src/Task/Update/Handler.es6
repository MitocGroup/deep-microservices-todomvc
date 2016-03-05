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
    let taskId = request.getParam('Id');

    if (typeof taskId !== 'string') {
      throw new InvalidArgumentException(taskId, 'string');
    }

    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.updateItem(taskId, request.data, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(task.get()).send();
    });
  }
}
