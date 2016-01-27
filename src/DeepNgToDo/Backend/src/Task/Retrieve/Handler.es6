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
   * @param request
   */
  handle(request) {
    let todoId = request.getParam('Id');

    if (todoId) {
      this.retrieveTodo(todoId, (todo) => {
        return this.createResponse(todo).send();
      });
    } else {
      this.retrieveAllTodo((result) => {
        return this.createResponse(result).send();
      });
    }
  }

  /**
   * @param {Function} callback
   */
  retrieveAllTodo(callback) {
    let TodoModel = this.kernel.get('db').get('Todo');

    TodoModel.findAll((err, todo) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return callback(todo.Items);
    });
  }

  /**
   * @param {String} todoId
   * @param {Function} callback
   */
  retrieveTodo(todoId, callback) {
    let TodoModel = this.kernel.get('db').get('Todo');

    TodoModel.findOneById(todoId, (err, todo) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return callback(todo ? todo.get() : null);
    });
  }
}
