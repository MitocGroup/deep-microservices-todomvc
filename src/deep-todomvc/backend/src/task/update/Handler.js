'use strict';

const DeepFramework = require('deep-framework');

class TaskUpdate extends DeepFramework.Core.AWS.Lambda.Runtime {

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
    let tasks = [];
    let TaskModel = this.kernel.get('db').get('Task');

    if (requestData.hasOwnProperty('Id')) {
      tasks.push(requestData);
    } else {
      tasks = requestData;
    }

    tasks.forEach(task => {
      TaskModel.updateItem(task.Id, task, (err) => {
        if (err) {
          throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
        }

        if (tasks.length === ++count) {
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
          Id: Joi.string().required(),
          Title: Joi.string().required(),
          Completed: Joi.boolean()
        })),
        Joi.object().keys({
          Id: Joi.string().required(),
          Title: Joi.string().required(),
          Completed: Joi.boolean()
        })
      );
    };
  }
}

module.exports = TaskUpdate;
