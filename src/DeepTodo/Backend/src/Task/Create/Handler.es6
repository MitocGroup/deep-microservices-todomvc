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
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.createItem(request.data, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(task.get()).send();
    });
  }
}
