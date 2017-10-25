'use strict';

const chai = require('chai');

describe('Test environment Health-check', () => {
  it('Test chai to be installed', done => {
    chai.expect(chai).to.be.an('object');
    done();
  });
});
