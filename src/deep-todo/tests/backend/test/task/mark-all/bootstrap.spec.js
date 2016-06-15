// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue Jun 14 2016 21:38:46 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/task/mark-all/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-todo-task-mark-all module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
