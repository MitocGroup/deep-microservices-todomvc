'use strict';

import moduleName from './name';

if (!window.DEEP_SW_CACHE_FLAG) {
  System.import('/deep-todomvc/stylesheets/todomvc-common/base.css!');
  System.import('/deep-todomvc/stylesheets/todomvc-app-css/index.css!');
  System.import('/deep-todomvc/js/vendor/npm/todomvc-common@1.0.2/base.js');
}

import './module/index';
import './controllers/index';
import './services/index';
import './directives/index';

export default moduleName;
