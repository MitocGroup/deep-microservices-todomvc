'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

//
//module(function($provide) {
//  $provide.factory('deepNgLoginService', function($q) {
//    var anonymousLogin = jasmine.createSpy('anonymousLogin').andCallFake(function() {
//      var token = 'test_token';
//
//      if (passPromise) {
//        return $q.when(token);
//      } else {
//        return $q.reject('something went wrong');
//      }
//
//    });
//
//    return {
//      anonymousLogin: anonymousLogin,
//    };
//  });
//});



describe('Controllers', function() {
  let $controller;
  let $rootScope;
  let mockDeepNgToDoService;
  let passPromise = true;
  let controller;

  // Mocked Service
  angular.module('mock.login', []).
    factory('deepNgLoginService', function($q) {
      var anonymousLogin = jasmine.createSpy('anonymousLogin').andCallFake(function() {
        var token = 'test_token';

        if (passPromise) {
          return $q.when(token);
        } else {
          return $q.reject('something went wrong');
        }

      });

      return {
        anonymousLogin: anonymousLogin,
      };
    });


  beforeEach(function() {
    angular.mock.module(moduleName);
  });

  beforeEach(function() {
    angular.module('mock.login');
  });

  beforeEach(inject(function(_$rootScope_, _$controller_, _deepNgLoginService_) {
    mockDeepNgToDoService = {
      fetchAllToDo: function() {
        return ['test','fetched'];
      },
      todoList: ['test','fetched'],
      editedTodo: null,
      allChecked: false,
    };

    $rootScope = _$rootScope_;
    $controller = _$controller_;

    let inputParameters = {
      $scope: {toDoService: 'test'},
      deepNgToDoService: mockDeepNgToDoService,
      deepNgLoginService: _deepNgLoginService_,
    };

    $rootScope.$digest();

    controller = $controller('DeepNgToDoController', inputParameters);
  }));

  describe('DeepNgToDoController', function() {
    it('Controller is implemented', function() {
      //expect(Object.keys(controller).length).toBe(4);
      //expect(Object.keys(controller)).toContain('_deepNgToDoService');
      //expect(Object.keys(controller)).toContain('newTodo');
      //expect(Object.keys(controller)).toContain('todoList');
      //expect(Object.keys(controller)).toContain('editedTodo');
    });
  });
});
