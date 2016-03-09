'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

describe('Directives', function() {

  var scope, compile, browser;

  beforeEach(function() {
    angular.mock.module(moduleName);
  });

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function($rootScope, $compile, $browser) {
    scope = $rootScope.$new();
    compile = $compile;
    browser = $browser;
  }));

  describe('Positive suite', function() {
    it('should escape on truthy expression', function() {
      var el = angular.element('<input todo-escape="escape">');

      scope.escape = false;

      compile(el)(scope);
      expect(browser.deferredFns.length, 'for escape=false').toBe(0);

      scope.$apply(function() {
        scope.escape = true;
      });

      expect(browser.deferredFns.length, 'for escape=true').toBe(0);
    });
  });
});
