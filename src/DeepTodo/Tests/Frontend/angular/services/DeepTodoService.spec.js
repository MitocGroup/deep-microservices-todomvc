'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

describe('Services', function() {
  let deepTodoService;
  let $q;

  beforeEach(function() {
    // load the module.
    module(moduleName);

    // inject your service for testing.
    // The _underscores_ are a convenience thing
    // so you can have your variable name be the
    // same as your injected service.
    inject(function(_deepTodoService_, _$q_) {
      deepTodoService = _deepTodoService_;
      $q = _$q_;
    });
  });

  it('Check constructor sets valid default values', function() {
    expect(angular.isObject(deepTodoService)).toBe(true);

    expect(angular.isObject(deepTodoService.todoResource)).toBe(true);
    expect(deepTodoService.todoResource._name).toBe('task');

    expect(angular.isFunction(deepTodoService.$q)).toBe(true);

    expect(deepTodoService.todoList).toEqual([]);

    expect(deepTodoService.editedTask).toBe(null);
    expect(deepTodoService.allChecked).toBe(false);
  });

  it('Check createTask() with title returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        actualResult = deepTodoService.createTask('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check createTask() with title returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };

      try {
        actualResult = deepTodoService.createTask('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check updateTask() method returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        actualResult = deepTodoService.updateTask('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check updateTask() method returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };
      try {
        actualResult = deepTodoService.updateTask('test');
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check fetchAllTodo() method returns promise with !reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };

      try {
        actualResult = deepTodoService.fetchAllTodo();
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check fetchAllTodo() method returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        actualResult = deepTodoService.fetchAllTodo();
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check deleteTask() method returns promise with reponse.isError',
    function() {
      let todo = {
        Title: 'first todo',
        Completed: false,
      };
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };

      try {
        deepTodoService.todoList = [todo,];
        actualResult = deepTodoService.deleteTask(todo);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );

  it('Check deleteTask() method returns promise with !reponse.isError',
    function() {
      let todo = {
        Title: 'first todo',
        Completed: false,
      };
      let error = null;
      let actualResult = null;
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };

      try {
        deepTodoService.todoList = [todo,];
        actualResult = deepTodoService.deleteTask(todo);
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
    deepTodoService.todoList = [todo,];
    expect(deepTodoService.toggleCompleted(todo, true)).not.toEqual(null);
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
    deepTodoService.todoList = [todo,];
    expect(deepTodoService.todoNgClass(todo)).toEqual(expectedResult);
  });

  it('Check editTask() method clones todo to restore it on demand',
    function() {
      let todo = {
        Title: 'first todo',
        Completed: false,
      };
      deepTodoService.todoList = [todo,];
      deepTodoService.editTask(todo);

      // check values
      expect(deepTodoService.editedTask).toEqual(todo);
      expect(deepTodoService.originalTask).toEqual(todo);

      // check object references
      expect(deepTodoService.editedTask).toBe(todo);
      expect(deepTodoService.originalTask).not.toBe(todo);
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
    deepTodoService.todoList = [firstUncompletedTask, completedTask,
      secondUncompletedTask,];
    deepTodoService.markAll(true);
    for (let todo of deepTodoService.todoList) {
      expect(todo.Completed).toBe(true);
    }
  });

  it('Check deleteCompleted() method returns promise with reponse.isError',
    function() {
      deepTodoService.todoResource = {
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
      deepTodoService.todoList = [firstUncompletedTask, completedTask,
        secondUncompletedTask,];
      let actualResult = null;
      let error = null;
      try {
        actualResult = deepTodoService.deleteCompleted();
      } catch (e) {
        error = e;
      }

      for (let todo of deepTodoService.todoList) {
        expect(todo.Completed).toBe(false);
      }
    }
  );

  it('Check deleteCompleted() method returns promise with !reponse.isError',
    function() {
      deepTodoService.todoResource = {
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
      deepTodoService.todoList = [firstUncompletedTask, completedTask,
        secondUncompletedTask,];
      let actualResult = null;
      let error = null;
      try {
        actualResult = deepTodoService.deleteCompleted();
      } catch (e) {
        error = e;
      }

      for (let todo of deepTodoService.todoList) {
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
    let originalTask = {
      Title: 'original todo',
      Completed: true,
    };
    deepTodoService.originalTask = originalTask;
    deepTodoService.todoList = [uncompletedTask, completedTask];
    try {
      deepTodoService.revertEdits(completedTask);
    } catch (e) {
      error = e;
    }

    expect(error).toBe(null);
    expect(deepTodoService.todoList[1]).toBe(originalTask);
    expect(deepTodoService.editedTask).toBe(null);
    expect(deepTodoService.originalTask).toBe(null);
    expect(deepTodoService.reverted).toBe(true);
  });

  it('Check markAllSend() method returns promise with reponse.isError',
    function() {
      let error = null;
      let actualResults = null;
      deepTodoService.todoList = [{Title: 'todo', Completed: false,},];
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({isError: true, error: '404: Not Found'});
            },
          };
        },
      };
      try {
        deepTodoService.markAllSend(false);
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
      deepTodoService.todoList = [{Title: 'todo', Completed: false,},];
      deepTodoService.todoResource = {
        request: function() {
          return {
            send: function(cb) {
              return cb({data: 'test data'});
            },
          };
        },
      };
      try {
        deepTodoService.markAllSend(false);
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResults).not.toEqual({});
    }
  );
});
