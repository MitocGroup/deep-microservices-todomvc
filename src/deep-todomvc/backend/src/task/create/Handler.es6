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
   * @param {String[]} requestData
   */
  handle(requestData) {
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.createItem(requestData, (err, task) => {
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
        Title: Joi.string(),
        Completed: Joi.boolean(),
      });
    }
  }
}
