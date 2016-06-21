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
    let taskList = requestData;
    let TaskModel = this.kernel.get('db').get('Task');
    let deletedCount = 0;

    if (!taskList.length) {
      return this.createResponse({}).send();
    }

    taskList.forEach(task => {
      TaskModel.deleteById(task.Id, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (taskList.length === ++deletedCount) {
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
      }));
    }
  }
}
