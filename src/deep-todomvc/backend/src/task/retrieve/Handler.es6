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

    if (taskId) {
      this.retrieveTask(taskId, (task) => {
        return this.createResponse(task).send();
      });
    } else {
      this.retrieveAllTasks((result) => {
        return this.createResponse(result).send();
      });
    }
  }

  /**
   * @param {Function} callback
   */
  retrieveAllTasks(callback) {
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.findAll((err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return callback(task.Items);
    });
  }

  /**
   * @param {String} taskId
   * @param {Function} callback
   */
  retrieveTask(taskId, callback) {
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.findOneById(taskId, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return callback(task ? task.get() : null);
    });
  }

  /**
   * @returns {Function}
   */
  get validationSchema() {
    return (Joi) => {
      return Joi.object().keys({
        Id: Joi.string().optional(),
      });
    }
  }
}
