'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';


describe('Services', function() {
  let deepNgToDoService;
  let $q;

  beforeEach(function() {
    // load the module.
    module(moduleName);

    // inject your service for testing.
    // The _underscores_ are a convenience thing
    // so you can have your variable name be the
    // same as your injected service.
    inject(function(_deepNgToDoService_, _$q_) {
      deepNgToDoService = _deepNgToDoService_;
      $q = _$q_;
    });
  });

  it('Check constructor sets valid default values', function() {
    expect(angular.isObject(deepNgToDoService)).toBe(true);

    expect(angular.isObject(deepNgToDoService.todoResource)).toBe(true);
    expect(deepNgToDoService.todoResource._name).toBe('todo');

    expect(angular.isFunction(deepNgToDoService.$q)).toBe(true);

    expect(deepNgToDoService.todoList).toEqual([]);

    expect(deepNgToDoService.editedTodo).toBe(null);
    expect(deepNgToDoService.allChecked).toBe(false);
  });

  it('Check createToDo() method for !title returns false', function() {
    expect(deepNgToDoService.createToDo()).toBe(false);
  });

  it('Check createToDo() method with title returns promise', function() {
    expect(deepNgToDoService.createToDo('test')).not.toEqual(null);
  });

  it('Check hasToDo() method returns false', function() {
    expect(deepNgToDoService.hasTodo).toBe(false);
  });

  it('Check updateTodo() method returns promise', function() {
    spyOn(deepNgToDoService.todoResource.request('update', 'test'), 'send').and.returnValue($q.when({ isError: false }));

    expect(deepNgToDoService.updateTodo('test')).not.toEqual(null);
  });

  it('Check fetchAllToDo() method returns promise', function() {
    spyOn(deepNgToDoService.todoResource.request('retrieve', {}), 'send').and.returnValue($q.when({ isError: false }));

    expect(deepNgToDoService.fetchAllToDo()).not.toEqual(null);
  });

  it('Check todoNumber() getter returns 0', function() {
    expect(deepNgToDoService.todoNumber).toBe(0);
  });

  it('Check completedCount() getter returns 0', function() {
    expect(deepNgToDoService.completedCount).toBe(0);
  });

  it('Check deleteTodo() method returns promise', function() {
    let todo = {
      Title: 'first todo',
      Completed: false,
    };
    deepNgToDoService.todoList = [todo,];
    expect(deepNgToDoService.todoNumber).toBe(1);
    expect(deepNgToDoService.deleteTodo(todo)).not.toEqual(null);
    expect(deepNgToDoService.todoNumber).toBe(0);
  });

  it('Check toggleCompleted() method returns promise', function() {
    let todo = {
      Title: 'first todo',
      Completed: false,
    };
    deepNgToDoService.todoList = [todo,];
    expect(deepNgToDoService.todoNumber).toBe(1);
    expect(deepNgToDoService.toggleCompleted(todo, true)).not.toEqual(null);
  });

  it('Check todoNgClass() method returns valid object', function() {
    let todo = {
      Title: 'first todo',
      Completed: false,
    };
    let expectedResult = {
      completed: todo.Completed,
      editing: null,
    };
    deepNgToDoService.todoList = [todo,];
    expect(deepNgToDoService.todoNumber).toBe(1);
    expect(deepNgToDoService.todoNgClass(todo)).toEqual(expectedResult);
  });

  it('Check editTodo() method clones todo to restore it on demand', function() {
    let todo = {
      Title: 'first todo',
      Completed: false,
    };
    deepNgToDoService.todoList = [todo,];
    expect(deepNgToDoService.todoNumber).toBe(1);
    deepNgToDoService.editTodo(todo);

    // check values
    expect(deepNgToDoService.editedTodo).toEqual(todo);
    expect(deepNgToDoService.originalTodo).toEqual(todo);

    // check object references
    expect(deepNgToDoService.editedTodo).toBe(todo);
    expect(deepNgToDoService.originalTodo).not.toBe(todo);
  });

  it('Check markAll() method', function() {
    let firstUncompletedTask = {
      Title: 'first todo',
      Completed: false,
    };
    let secondUncompletedTask = {
      Title: 'second todo',
      Completed: false,
    };
    let completedTask = {
      Title: 'todo',
      Completed: true,
    };
    deepNgToDoService.todoList = [firstUncompletedTask, completedTask, secondUncompletedTask];
    expect(deepNgToDoService.todoNumber).toBe(2);
    deepNgToDoService.markAll(true);
    for (let todo of deepNgToDoService.todoList) {
      expect(todo.Completed).toBe(true);
    }
  });

  it('Check deleteCompleted() method', function() {
    let firstUncompletedTask = {
      Title: 'first todo',
      Completed: false,
    };
    let secondUncompletedTask = {
      Title: 'second todo',
      Completed: false,
    };
    let completedTask = {
      Title: 'todo',
      Completed: true,
    };
    deepNgToDoService.todoList = [firstUncompletedTask, completedTask, secondUncompletedTask];
    expect(deepNgToDoService.completedCount).toBe(1);
    let actualResult = null;
    let error = null;
    try {
      actualResult = deepNgToDoService.deleteCompleted();
    } catch (e) {
      error = e;
    }

    for (let todo of deepNgToDoService.todoList) {
      expect(todo.Completed).toBe(false);
    }
  });




  it('Check revertEdits() method', function() {
    let error = null;
    let uncompletedTask = {
      Title: 'second todo',
      Completed: false,
    };
    let completedTask = {
      Title: 'todo',
      Completed: true,
    };
    let originalTodo = {
      Title: 'original todo',
      Completed: true,
    };
    deepNgToDoService.originalTodo = originalTodo;
    deepNgToDoService.todoList = [uncompletedTask, completedTask];
    try {
      deepNgToDoService.revertEdits(completedTask);
    } catch (e) {
      error = e;
    }

    expect(error).toBe(null);
    expect(deepNgToDoService.todoList[1]).toBe(originalTodo);
    expect(deepNgToDoService.editedTodo).toBe(null);
    expect(deepNgToDoService.originalTodo).toBe(null);
    expect(deepNgToDoService.reverted).toBe(true);
  });
});