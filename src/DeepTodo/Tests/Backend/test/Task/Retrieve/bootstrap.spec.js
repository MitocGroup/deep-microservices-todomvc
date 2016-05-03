// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 17:18:48 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/Task/Retrieve/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-todo-task-retrieve module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
