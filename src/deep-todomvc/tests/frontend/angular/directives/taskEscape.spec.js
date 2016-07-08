// THIS TEST WAS GENERATED AUTOMATICALLY ON 07/08/2016 09:23:25

/* global angular */
/* global inject */

'use strict';

import moduleName from '../../../../frontend/js/app/angular/name';

// @todo: Add more advanced tests
describe('Directives', () => {

  let element;
  let compiledElement;
  let $compile;
  let $rootScope;

  beforeEach(() => {
    module('ui.router');
    angular.mock.module(moduleName);
  });

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject((_$rootScope_, _$compile_) => {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    element = angular.element('<div data-ng-model="testedModelValue" task-escape div>');
    $rootScope.testedModelValue = null;
    $rootScope.$digest();

    // Compile a piece of HTML containing the directive
    // fire all the watches, so the scope expressions will be evaluated
    compiledElement = $compile(element)($rootScope);
  }));

  //@todo - should be added different directive's use cases
  describe('taskEscape', () => {
    it('task-escape exists', () => {
      expect(true).toBe(true);
    });
  });
});
