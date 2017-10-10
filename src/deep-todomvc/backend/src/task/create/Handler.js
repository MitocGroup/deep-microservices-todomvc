'use strict';

const DeepFramework = require('deep-framework');

class TaskCreate extends DeepFramework.Core.AWS.Lambda.Runtime {

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

module.exports = TaskCreate;
