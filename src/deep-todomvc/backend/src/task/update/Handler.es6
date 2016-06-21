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
   * @param {Object} requestData
   */
  handle(requestData) {
    let taskId = requestData.Id;
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.updateItem(taskId, requestData, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(task.get()).send();
    });
  }

  /**
   * @returns {Function}
   */
  get validationSchema() {
    return (Joi) => {
      return Joi.object().keys({
        Id: Joi.string().required(),
        Title: Joi.string(),
        Completed: Joi.boolean(),
      });
    }
  }
}
