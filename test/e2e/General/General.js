/* global browser */
/* global protractor */
/* global element */
/* global by */

'use strict';

var config = require('../protractor.config.js');

var General = function() {
  this.waitCustom = function(array, maxIndex, message) {
    browser.wait(function() {
      return array.count().then(function(count) {
        if (count > maxIndex) {
          return protractor.ExpectedConditions.visibilityOf(array.get(0));
        }
      });
    }, config.config.jasmineNodeOpts.defaultTimeoutInterval/2, message);
  };
};

module.exports = new General();
