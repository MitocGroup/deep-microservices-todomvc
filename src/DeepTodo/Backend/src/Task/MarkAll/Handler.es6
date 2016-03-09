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
    let taskItems = request.data;

    if (!Array.isArray(taskItems)) {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(taskItems, 'array');
    }

    let TaskModel= this.kernel.get('db').get('Task');
    let updatedCount = 0;

    if (!taskItems.length) {
      return this.createResponse({}).send();
    }

    taskItems.forEach((task) => {
      if (typeof task !== 'object') {
        throw new DeepFramework.Core.Exception.InvalidArgumentException(task, 'object');
      }

      if (typeof task.Id !== 'string') {
        throw new InvalidArgumentException(task.Id, 'string');
      }

      TaskModel.updateItem(task.Id, task, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (taskItems.length == ++updatedCount) {
          return this.createResponse({}).send();
        }
      });
    });
  }
}
