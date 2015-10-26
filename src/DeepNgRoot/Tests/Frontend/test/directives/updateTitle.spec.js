'use strict';

import moduleName from '../../../../Frontend/js/app/name';

describe('Directives', function() {

  var scope, compile, browser;

  beforeEach(function() {
    angular.module(moduleName);
  });

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function($rootScope, $compile, $browser) {
    scope = $rootScope.$new();
    compile = $compile;
    browser = $browser;
  }));

  describe('Positive suite', function() {
    it('should update on truthy expression', function() {
      var element = angular.element('<title update-title="update text">');
      var compiledElement = compile(element)(scope);

      // fire all the watches
      scope.$digest();

      // Check that the compiled element contains the templated content
      expect(compiledElement.html()).not.toContain('It works!');
    });
  });
});
