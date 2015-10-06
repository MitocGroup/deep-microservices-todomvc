'use strict';
'format es6';

import moduleName from '../name';

class Config {
  constructor() {
  }
}

angular.module(moduleName).config([function(...args) {
  return new Config(...args);
},]);
