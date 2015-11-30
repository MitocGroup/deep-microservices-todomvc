'use strict';

var leftPanel = require('../POMs/LeftPanel.js');

describe('Check all controls of the left panel', function() {

  beforeAll(function() {
    //Opening ToDoApp
    browser.get(leftPanel.url);
  });

  it('Validating that all controls exist and valid', function() {
    leftPanel.validateControls();
  });
});
