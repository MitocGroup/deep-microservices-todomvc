'use strict';

const DeepFramework = require('deep-framework');

class TaskRetrieve extends DeepFramework.Core.AWS.Lambda.Runtime {

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

    TaskModel.findAll((err, res) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(res.Items).send();
    });
  }

  /**
   * @returns {Function}
   */
  get validationSchema() {
    return (Joi) => {
      return Joi.object();
    }
  }
}

module.exports = TaskRetrieve;
