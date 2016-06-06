// THIS TEST WAS GENERATED AUTOMATICALLY ON Mon Jun 06 2016 16:16:38 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/task/mark-all/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-todo-task-mark-all module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
