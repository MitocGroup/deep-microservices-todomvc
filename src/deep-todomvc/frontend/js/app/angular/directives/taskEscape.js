/* global angular */

'use strict';
'format es6';

import moduleName from '../name';

export default
angular.module(moduleName)
  .directive('taskEscape', function taskEscapeDirective() {
    var ESCAPE_KEY = 27;
    return function(scope, elem, attrs) {
      elem.bind('keydown', function(event) {
        if (event.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.taskEscape);
        }
      });

      scope.$on('$destroy', function() {
        elem.unbind('keydown');
      });
    };
  });
