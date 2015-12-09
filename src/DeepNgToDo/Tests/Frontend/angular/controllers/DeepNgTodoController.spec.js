'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

describe('Controllers', function() {
  let scope;
  let passPromise = true;
  let controller;

  // Mocked Services
  angular.module('mocks', [])
    .factory('deepNgLoginService', function($q) {
      var anonymousLogin = jasmine.createSpy('anonymousLogin')
        .andCallFake(function() {
        var token = 'test_token';

        if (passPromise) {
          return $q.when(token);
        } else {
          return $q.reject('something went wrong');
        }

      });

      return {
        anonymousLogin: anonymousLogin(),
      };
    })
    .factory('deepNgToDoService', function() {
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
        originalTodo: {
          Title: 'todo',
          Completed: true,
        },
      };
    });

  beforeEach(function() {
    angular.mock.module(moduleName);
    angular.module('mocks');
  });

  beforeEach(
    inject(
      ($rootScope, $controller, _deepNgLoginService_, _deepNgToDoService_) => {
        scope = $rootScope.$new();

        let inputParameters = {
          $scope: scope,
          deepNgToDoService: _deepNgToDoService_,
          deepNgLoginService: _deepNgLoginService_,
        };

        scope.$digest();

        controller = $controller('DeepNgToDoController', inputParameters);
        scope.$digest();
      })
  );

  describe('DeepNgToDoController', function() {
    it('DeepNgToDoController constructor sets valid default values',
      function() {
        expect(Object.keys(controller).length).toBe(5);
        expect(typeof controller.toDoService).toEqual('object');
        expect(typeof controller.deepLog).toEqual('object');
      }
    );

    it('create() sets title="" and saving=false with response.isError',
      function() {
        let actualResult = null;
        let error = null;
        controller.title = 'test';

        try {
          actualResult = controller.create();
        } catch (e) {
          error = e;
        }

        //@todo - add check for async
        expect(error).toBe(null);
      }
    );

    it(
      'update() for event === "blur" && this.prevEvent === "submit"',
      function() {
        let actualResult = null;
        let error = null;
        let completedTask = {
          Title: 'todo',
          Completed: true,
        };
        controller.prevEvent = 'submit';

        try {
          actualResult = controller.update(completedTask, 'blur');
        } catch (e) {
          error = e;
        }

        expect(actualResult).toBe(undefined);
        expect(error).toBe(null);
        expect(controller.prevEvent).toBe(null);
      }
    );

    it('update() method for reverted === true ', function() {
      let actualResult = null;
      let error = null;
      let completedTask = {
        Title: 'todo',
        Completed: true,
      };
      let event = 'blur';
      controller.prevEvent = false;
      controller.toDoService.reverted = true;

      try {
        actualResult = controller.update(completedTask, event);
      } catch (e) {
        error = e;
      }

      expect(actualResult).toBe(undefined);
      expect(error).toBe(null);
      expect(controller.toDoService.reverted).toBe(null);
    });

    it(
      'update() !reverted and todo.Title !== toDoService.originalTodo.Title',
      function() {
        let actualResult = null;
        let error = null;
        let completedTask = {
          Title: 'new todo',
          Completed: true,
        };
        let event = 'blur';
        controller.prevEvent = false;
        controller.toDoService.reverted = false;

        try {
          actualResult = controller.update(completedTask, event);
        } catch (e) {
          error = e;
        }

        expect(error).toBe(null);
        expect(controller.toDoService.reverted).toBe(false);
        expect(controller.toDoService.editedTodo).toBe(null);
        expect(actualResult).toBe(undefined);
      }
    );

    it('delete() method', function() {
      let error = null;
      let completedTask = {
        Title: 'todo',
        Completed: true,
      };

      try {
        controller.delete(completedTask);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
    });

    it('toggleCompleted() method', function() {
      let error = null;
      let completedTask = {
        Title: 'todo',
        Completed: true,
      };

      try {
        controller.toggleCompleted(completedTask, true);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
    });

    it('markAll() method', function() {
      let error = null;

      try {
        controller.markAll(true);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
    });
  });
});
