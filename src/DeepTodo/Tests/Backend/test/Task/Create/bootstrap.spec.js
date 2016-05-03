// THIS TEST WAS GENERATED AUTOMATICALLY ON Wed May 04 2016 02:04:27 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/Task/Create/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-todo-task-create module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
