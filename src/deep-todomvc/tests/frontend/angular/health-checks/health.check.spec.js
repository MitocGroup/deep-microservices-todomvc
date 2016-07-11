/* global angular */

/* jshint undef: false, unused: false */

'use strict';

import moduleName from '../../../../frontend/js/app/angular/name';

describe('Health checks', () => {
  it('Should load angular library', () => {
    expect(typeof angular).toBe('object');
  });

  it('Should load angular version 1.4.0', () => {
    expect(angular.version.full).toBe('1.4.0');
  });

  it('Should load angular ui router', () => {
    expect(angular.module('ui.router').name).toBe('ui.router');
  });

  it('Should load ngMock', () => {
    expect(typeof angular.mock.module).toBe('function');
    expect(typeof inject).toBe('function');
    expect(typeof dump).toBe('function');
  });

  it('Module name is [todo]', () => {
    expect(moduleName).toBe('todo');
  });

});
