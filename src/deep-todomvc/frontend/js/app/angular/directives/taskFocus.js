/* global angular */

'use strict';
'format es6';

import moduleName from '../name';

export default
angular.module(moduleName)
  .directive('taskFocus', ['$timeout', function taskFocusDirective($timeout) {
    return function(scope, elem, attrs) {
      scope.$watch(attrs.taskFocus, function(newVal) {
        if (newVal) {
          $timeout(function() {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  }
]);
