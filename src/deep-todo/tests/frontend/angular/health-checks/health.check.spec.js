'use strict';
'format es6';

import moduleName from '../../../../frontend/js/app/angular/name';

describe('Health checks', function() {
  it('Should load angular library', function() {
    expect(typeof angular).toBe('object');
  });

  it('Should load angular version 1.4.0', function() {
    expect(angular.version.full).toBe('1.4.0');
  });

  it('Should load angular ui router', function() {
    expect(angular.module('ui.router').name).toBe('ui.router');
  });

  it('Should load ngMock', function() {
    expect(typeof angular.mock.module).toBe('function');
    expect(typeof inject).toBe('function');
    expect(typeof dump).toBe('function');
  });

  it('Module name is [todo]', function() {
    expect(moduleName).toBe('todo');
  });
});
