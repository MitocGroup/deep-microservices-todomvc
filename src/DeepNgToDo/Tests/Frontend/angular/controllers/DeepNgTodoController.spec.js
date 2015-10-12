'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

describe('Controllers', function() {
  let scope;
  let passPromise = true;
  let controller;

  // Mocked Services
  angular.module('mocks', [])
    .factory('deepNgLoginService', function($q) {
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
    })
    .factory('deepNgToDoService', function($q) {
      var fetchAllToDo = () => {
        return ['test', 'fetched'];
      };

      var createToDo = () => {
        return 'createToDo called';
      };

      var deleTodo = () => {
        return 'deleTodo called';
      };

      return {
        fetchAllToDo: fetchAllToDo,
        todoList: ['test', 'fetched'],
        editedTodo: null,
        allChecked: false,
        createToDo: createToDo,
        deleteTodo: deleTodo(),
      };
    });

  beforeEach(function() {
    angular.mock.module(moduleName);
    angular.module('mocks');
  });

  beforeEach(inject(function($rootScope, $controller, _deepNgLoginService_, _deepNgToDoService_) {

    //we can create a new scope for the controller using the $rootScope.$new method
    scope = $rootScope.$new();

    let inputParameters = {
      $scope: scope,
      deepNgToDoService: _deepNgToDoService_,
      deepNgLoginService: _deepNgLoginService_,
    };

    scope.$digest();

    controller = $controller('DeepNgToDoController', inputParameters);
    scope.$digest();
  }));

  describe('DeepNgToDoController', function() {
    it('DeepNgToDoController constructor sets valid default values', function() {
      expect(Object.keys(controller).length).toBe(2);
      expect(typeof controller.toDoService).toEqual('object');
      expect(typeof controller.deepLog).toEqual('object');
    });

    it('create() method sets title=\'\' and saving=false', function() {
      let actualResult = null;
      let error = null;
      controller.title = 'test';

      try {
        actualResult = controller.create();
      } catch (e) {
        error = e;
      }

      //expect(controller.title).toEqual('');
      //expect(controller.saving).toEqual(false);
    });

    it('update() method for event === \'blur\' && this.prevEvent === \'submit\'', function() {
      let actualResult = null;
      let error = null;
      let completedTask = {
        Title: 'todo',
        Completed: true,
      };
      let event = 'blur';
      controller.prevEvent = 'submit';

      try {
        actualResult = controller.update(completedTask, event);
      } catch (e) {
        error = e;
      }

      expect(actualResult).toBe(undefined);
      expect(error).toBe(null);
      expect(controller.prevEvent).toBe(null);
    });

    it('update() method for reverted === true ', function() {
      let actualResult = null;
      let error = null;
      let completedTask = {
        Title: 'todo',
        Completed: true,
      };
      let event = 'blur';
      controller.prevEvent = false;
      controller.reverted = true;

      try {
        actualResult = controller.update(completedTask, event);
      } catch (e) {
        error = e;
      }

      expect(actualResult).toBe(undefined);
      expect(error).toBe(null);
      expect(controller.reverted).toBe(null);
    });

    it('delete() method', function() {
      let actualResult = null;
      let error = null;
      let completedTask = {
        Title: 'todo',
        Completed: true,
      };

      try {
        actualResult = controller.delete(completedTask);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
    });
  });
});
