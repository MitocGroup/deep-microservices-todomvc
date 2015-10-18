'use strict';
'format es6';

import './module/index';
import './directives/index';
import moduleName from './name';

export function bootstrap() {

  //Bootstrap the ng application
  angular.element(document).ready(function() {
    try {
      angular.bootstrap(document, [moduleName], {strictDi: true});
    } catch (e) {
      DeepFramework.Kernel.container.get('log').log(e);
    }
  });
}
