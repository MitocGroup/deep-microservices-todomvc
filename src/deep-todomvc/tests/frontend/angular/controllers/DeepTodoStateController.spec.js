// THIS TEST WAS GENERATED AUTOMATICALLY ON 07/08/2016 09:23:25

/* global angular */
/* global inject */

'use strict';

import moduleName from '../../../../frontend/js/app/angular/name';

// @todo: Add more advanced tests
describe('Controllers', () => {
  let scope;
  let controller;

  // Mocked Services
  angular.module('mocks', []);

  beforeEach(function() {
    module('ui.router');
    angular.module('mocks');
    angular.mock.module(moduleName);
  });

  beforeEach(
    inject(
      ($rootScope, $controller) => {
        scope = $rootScope.$new();

        let inputParameters = {
          $scope: scope,
          $modalInstance: {},
        };

        scope.$digest();

        controller = $controller('DeepTodoStateController', inputParameters);
        scope.$digest();
    })
  );

  describe('DeepTodoStateController', () => {
    it('Check DeepTodoStateController constructor', () => {
      expect(typeof controller).toEqual('object');
    });
  });

});
