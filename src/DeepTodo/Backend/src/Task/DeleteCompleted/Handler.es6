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
    let taskIds = request.data;

    if (!Array.isArray(taskIds)) {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(taskIds, 'array');
    }

    let TaskModel = this.kernel.get('db').get('Task');
    let deletedCount = 0;

    if (!taskIds.length) {
      return this.createResponse({}).send();
    }

    taskIds.forEach((taskId) => {
      if (typeof taskId !== 'string') {
        throw new DeepFramework.Core.Exception.InvalidArgumentException(taskId, 'string');
      }

      TaskModel.deleteById(taskId, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (taskIds.length === ++deletedCount) {
          return this.createResponse({}).send();
        }
      });
    });
  }
}
