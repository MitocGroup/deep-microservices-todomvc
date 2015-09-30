'use strict';
'format es6';

import moduleName from '../name';

class Config {
  constructor() {
  }
}

Config.$inject = [];

angular.module(moduleName).config(function() {
  return new Config();
});
