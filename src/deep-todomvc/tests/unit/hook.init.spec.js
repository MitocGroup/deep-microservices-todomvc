'use strict';

const hookInit = require('../../hook.init');

describe('Check hook.init', () => {
  it('Test hook.init to be executable', done => {
    let context = {
      microservice: {
        property: {
          rootMicroservice: false
        }
      }
    };

    hookInit.call(context, function() {
      done();
    });
  });
});
