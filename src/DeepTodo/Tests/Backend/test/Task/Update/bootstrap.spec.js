// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 23:49:42 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/Task/Update/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-todo-task-update module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
