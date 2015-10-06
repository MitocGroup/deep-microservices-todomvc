'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

describe('Controllers', function() {
  let $controller;
  let $rootScope;

  beforeEach(function() {
    angular.mock.module(moduleName);
  });

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('DeepNgToDoController', function() {
    it('Controller is implemented', function() {
      let controller = $controller('DeepNgToDoController', {});
      expect(Object.keys(controller).length).toBe(4);
      expect(Object.keys(controller)).toContain('_deepNgToDoService');
      expect(Object.keys(controller)).toContain('newTodo');
      expect(Object.keys(controller)).toContain('todoList');
      expect(Object.keys(controller)).toContain('editedTodo');
    });
  });
});
