'use strict';

import moduleName from '../../../../frontend/js/app/angular/name';

describe('Controllers', function() {
  let scope;
  let passPromise = true;
  let controller;

  // Mocked Services
  angular.module('mocks', [])
    .factory('deepLoginService', function($q) {
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
    .factory('deepTodoService', function() {
      var fetchAllTasks = () => {
        return ['test', 'fetched'];
      };

      var createTask = () => {
        return 'createTask called';
      };

      var deleteTask = () => {
        return 'deleteTask called';
      };

      return {
        fetchAllTasks: fetchAllTasks,
        todoList: ['test', 'fetched'],
        editedTask: null,
        allChecked: false,
        createTask: createTask,
        deleteTask: deleteTask,
        originalTask: {
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
      ($rootScope, $controller, _deepLoginService_, _deepTodoService_) => {
        scope = $rootScope.$new();

        let inputParameters = {
          $scope: scope,
          deepTodoService: _deepTodoService_,
          deepLoginService: _deepLoginService_,
        };

        scope.$digest();

        controller = $controller('DeepTodoController', inputParameters);
        scope.$digest();
      })
  );

  describe('DeepTodoController', function() {
    it('DeepTodoController constructor sets valid default values',
      function() {
        expect(Object.keys(controller).length).toBe(4);
        expect(typeof controller.todoService).toEqual('object');
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
      controller.todoService.reverted = true;

      try {
        actualResult = controller.update(completedTask, event);
      } catch (e) {
        error = e;
      }

      expect(actualResult).toBe(undefined);
      expect(error).toBe(null);
      expect(controller.todoService.reverted).toBe(null);
    });

    it(
      'update() !reverted and todo.Title !== todoService.originalTask.Title',
      function() {
        let actualResult = null;
        let error = null;
        let completedTask = {
          Title: 'new todo',
          Completed: true,
        };
        let event = 'blur';
        controller.prevEvent = false;
        controller.todoService.reverted = false;

        try {
          actualResult = controller.update(completedTask, event);
        } catch (e) {
          error = e;
        }

        expect(error).toBe(null);
        expect(controller.todoService.reverted).toBe(false);
        expect(controller.todoService.editedTask).toBe(null);
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
