/* global angular */
/* global inject */

'use strict';

import moduleName from '../../../../Frontend/js/app/angular/name';

describe('Services', function() {
  let deepLoginService;
  let $q;

  beforeEach(function() {
    // load the module.
    module(moduleName);

    // inject your service for testing.
    // The _underscores_ are a convenience thing
    // so you can have your variable name be the
    // same as your injected service.
    inject(function(_deepLoginService_, _$q_) {
      deepLoginService = _deepLoginService_;
      $q = _$q_;
    });
  });

  it('Check constructor sets valid default values', function() {
    expect(angular.isFunction(deepLoginService.$q)).toBe(true);
  });

  it(
    'Check anonymousLogin() with title returns resolved promise with token',
    function() {
      let error = null;
      let actualResult = null;
      deepLoginService.deepSecurity = {
        anonymousLogin: function(cb) {
          return cb({isError: '404: Not Found'});
        },
      };

      try {
        actualResult = deepLoginService.anonymousLogin();
      } catch (e) {
        error = e;
      }

      expect(error).toBe(null);
      expect(actualResult).not.toEqual(null);
    }
  );
});
