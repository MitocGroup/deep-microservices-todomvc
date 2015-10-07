'use strict';
'format es6';

import moduleName from '../name';

export function registerModule(moduleNames) {
  var modules = [
    'ui.router',
  ].concat(moduleNames);
  angular.module(moduleName, modules);
}
