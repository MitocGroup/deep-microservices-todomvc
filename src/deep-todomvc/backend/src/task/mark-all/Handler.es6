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
    let taskItems = requestData;
    let TaskModel= this.kernel.get('db').get('Task');
    let updatedCount = 0;

    if (!taskItems.length) {
      return this.createResponse({}).send();
    }

    taskItems.forEach((task) => {
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

  /**
   * @returns {Function}
   */
  get validationSchema() {
    return (Joi) => {
      return Joi.array().includes(Joi.object().keys({
        Id: Joi.string(),
        Title: Joi.string(),
        Completed: Joi.boolean(),
      }));
    }
  }
}
