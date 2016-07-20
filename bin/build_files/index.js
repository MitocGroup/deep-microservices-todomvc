'use strict';
'format es6';

import 'angular';
import 'angular-ui-router';
import 'js/lib/css';
import {registerModules} from 'js/app/module/index';
import 'js/app/directives/index';

import moduleName from 'js/app/name';

import 'js/app/index';
import 'deep-todomvc/js/app/angular/index';

export function bootstrap() {

  //Bootstrap the ng application
  angular.element(document).ready(() => {

    try {

      angular.bootstrap(document, [moduleName], {strictDi: true});

    } catch (e) {
      console.log(e);
      DeepFramework.Kernel.container.get('log').log(e);
    }
  });
}

export {registerModules};
