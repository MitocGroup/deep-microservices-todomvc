'use strict';
'format es6';

/* global DeepFramework */
/* global angular */

import moduleName from '../name';

class DeepLoginService {

  /**
   * @param $q
   */
  constructor($q) {
    this.$q = $q;
  }

  /**
   *@return {promise}
   */
  anonymousLogin() {
    let defer = this.$q.defer();
    let deepSecurity = DeepFramework.Kernel.container.get('security');

    deepSecurity.anonymousLogin((token) => {
      defer.resolve(token);
    });

    return defer.promise;
  }
}

angular.module(moduleName).service('deepLoginService', ['$q', (...args) => {
  return new DeepLoginService(...args);
},]);
