/* global browser */

'use strict';

var leftPanel = require('../POMs/LeftPanel.js');
var config = require('../protractor.config.js');

describe('Check all controls of the left panel', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(leftPanel.url, config.config.jasmineNodeOpts.defaultTimeoutInterval);
  });

  it('Validating that all controls exist and valid', function() {
    //Validating that all controls exist and valid
    leftPanel.validateControls();
  });
});
