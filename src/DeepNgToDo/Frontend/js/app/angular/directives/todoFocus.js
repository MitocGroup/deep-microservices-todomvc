'use strict';
'format es6';

import moduleName from '../name';

export default
	angular.module(moduleName)
		.directive('todoFocus', ['$timeout', function todoEscapeDirective($timeout) {
		return function (scope, elem, attrs) {
			scope.$watch(attrs.todoFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	},])

