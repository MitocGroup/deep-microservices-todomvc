'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';


describe('Services', function() {
  let deepNgLoginService;
  let $q;

  beforeEach(function() {
    // load the module.
    module(moduleName);

    // inject your service for testing.
    // The _underscores_ are a convenience thing
    // so you can have your variable name be the
    // same as your injected service.
    inject(function(_deepNgLoginService_, _$q_) {
      deepNgLoginService = _deepNgLoginService_;
      $q = _$q_;
    });
  });

  it('Check constructor sets valid default values', function() {
    expect(angular.isFunction(deepNgLoginService.$q)).toBe(true);
  });



  it('Check anonymousLogin() method with title returns resolved promise with token', function() {
    let error = null;
    let actualResult = null;
    deepNgLoginService.deepSecurity = {
      anonymousLogin: function(cb) {
        return cb({isError: '404: Not Found'});
      },
    };

    try {
      actualResult = deepNgLoginService.anonymousLogin();
    } catch (e) {
      error = e;
    }

    expect(error).toBe(null);
    expect(actualResult).not.toEqual(null);
  });
});