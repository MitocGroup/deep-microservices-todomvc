// THIS TEST WAS GENERATED AUTOMATICALLY ON 07/11/2016 13:03:24

'use strict';

import moduleName from '../../../../frontend/js/app/angular/name';

  // @todo: Add more advanced tests
  describe('Directives', () => {

  let directiveElement;
  let compile;
  let scope, rootScope;
  let controller;

  beforeEach(() => {

    // Load modules
    module('ui.router');
    angular.mock.module(moduleName);


    // store references to scope, rootScope and compile
    // so they are available to all tests in this describe block
    //
    // $compile service that is responsible for compiling any HTML template
    // $templateCache  service that is responsible for caching template for quick retrieval
    // $controller service that is responsible for instantiating controllers
    // $rootScope ngMock’s service to allow getting an instance of angular’s core and create child scopes via its $new
    //
    // The underscores are a convenience trick to inject a service under a different name
    // so that we can locally assign a local variable of the same name as the service.
    inject(($controller, $templateCache, $compile, $rootScope) => {

      compile = $compile;
      rootScope = $rootScope;
      scope = $rootScope.$new();

      //how to set model testedModelValue value for directive
      //scope.testedModelValue = null;

      scope.$digest();


    });
  });

  /**
  * Return compiled directive ready for testing
  * @returns {HTMLDivElement}
  */
  function getCompiledElement() {
    let element = angular.element('<div task-escape></div>');
    let compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  //@todo - should be added directive's use cases by using "directiveElement"
  describe('taskEscape', () => {
    it('task-escape has html', () => {
      let error = null;

      try {
        directiveElement = getCompiledElement();
      } catch (exception) {
        error = exception;
      }

      if (!error) {
        expect(typeof directiveElement).toEqual('object');
        expect(directiveElement.html()).not.toEqual(undefined);
      }
    });
  });
});
