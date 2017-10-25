'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const { getDeepFramework } = require('../../utils');

const frontendPath = path.join(__dirname, '../../frontend');

describe('Check utils helper', () => {
  it('Test deep-framework to be downloadable', done => {
    let destPath = path.resolve(frontendPath, 'src/assets/js');

    getDeepFramework(destPath).then(() => {
      fs.stat(`${destPath}/deep-framework.min.js`, (err, stats) => {
        chai.expect(stats).to.not.be.undefined;
        done();
      });
    });
  });
});
