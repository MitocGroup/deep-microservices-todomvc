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

  it('Check createToDo() with title returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        actualResult = deepNgToDoService.createToDo('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check createToDo() with title returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };

      try {
        actualResult = deepNgToDoService.createToDo('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check updateTodo() method returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        actualResult = deepNgToDoService.updateTodo('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check updateTodo() method returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };
      try {
        actualResult = deepNgToDoService.updateTodo('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check fetchAllToDo() method returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };

      try {
        actualResult = deepNgToDoService.fetchAllToDo();
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check fetchAllToDo() method returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        actualResult = deepNgToDoService.fetchAllToDo();
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check deleteTodo() method returns promise with reponse.isError',
    function() {
      let todo = {
        Title: 'first todo',
        Completed: false,
      };
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        deepNgToDoService.todoList = [todo,];
        actualResult = deepNgToDoService.deleteTodo(todo);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check deleteTodo() method returns promise with !reponse.isError',
    function() {
      let todo = {
        Title: 'first todo',
        Completed: false,
      };
      let error = null;
      let actualResult = null;
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };

      try {
        deepNgToDoService.todoList = [todo,];
        actualResult = deepNgToDoService.deleteTodo(todo);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check toggleCompleted() method executes successfully', function() {
    let todo = {
      Title: 'first todo',
      Completed: false,
    };
    deepNgToDoService.todoList = [todo,];
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
    expect(deepNgToDoService.todoNgClass(todo)).toEqual(expectedResult);
  });

  it('Check editTodo() method clones todo to restore it on demand',
    function() {
      let todo = {
        Title: 'first todo',
        Completed: false,
      };
      deepNgToDoService.todoList = [todo,];
      deepNgToDoService.editTodo(todo);

      // check values
      expect(deepNgToDoService.editedTodo).toEqual(todo);
      expect(deepNgToDoService.originalTodo).toEqual(todo);

      // check object references
      expect(deepNgToDoService.editedTodo).toBe(todo);
      expect(deepNgToDoService.originalTodo).not.toBe(todo);
    }
  );

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
    deepNgToDoService.todoList = [firstUncompletedTask, completedTask,
      secondUncompletedTask,];
    deepNgToDoService.markAll(true);
    for (let todo of deepNgToDoService.todoList) {
      expect(todo.Completed).toBe(true);
    }
  });

  it('Check deleteCompleted() method returns promise with reponse.isError',
    function() {
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };
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
      deepNgToDoService.todoList = [firstUncompletedTask, completedTask,
        secondUncompletedTask,];
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
    }
  );

  it('Check deleteCompleted() method returns promise with !reponse.isError',
    function() {
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };
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
      deepNgToDoService.todoList = [firstUncompletedTask, completedTask,
        secondUncompletedTask,];
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
    }
  );

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

  it('Check markAllSend() method returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResults = null;
      deepNgToDoService.todoList = [{Title: 'todo', Completed: false,},];
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };
      try {
        deepNgToDoService.markAllSend(false);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResults).not.toEqual({});
    }
  );

  it('Check markAllSend() method returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResults = null;
      deepNgToDoService.todoList = [{Title: 'todo', Completed: false,},];
      deepNgToDoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };
      try {
        deepNgToDoService.markAllSend(false);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResults).not.toEqual({});
    }
  );
});
