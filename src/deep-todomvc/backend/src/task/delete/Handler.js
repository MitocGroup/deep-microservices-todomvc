'use strict';

const DeepFramework = require('deep-framework');

class TaskDelete extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param {Object|Array} requestData
   */
  handle(requestData) {
    let count = 0;
    let taskIds = [];
    let TaskModel = this.kernel.get('db').get('Task');

    if (requestData.hasOwnProperty('Id')) {
      taskIds.push(requestData.Id);
    } else {
      taskIds = requestData.map(item => {
        return item.Id;
      });
    }

    taskIds.forEach(taskId => {
      TaskModel.deleteById(taskId, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (taskIds.length === ++count) {
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
      return Joi.alternatives().try(
        Joi.array().includes(Joi.object().keys({
          Id: Joi.string().required()
        })),
        Joi.object().keys({
          Id: Joi.string().required()
        })
      );
    };
  }
}

module.exports = TaskDelete;
