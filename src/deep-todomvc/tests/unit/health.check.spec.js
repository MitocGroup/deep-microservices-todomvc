'use strict';

const chai = require('chai');

describe('Test environment Health-check', () => {
  it('Test chai to be an object', () => {
     chai.expect(chai).to.be.an('object');
  });
});
