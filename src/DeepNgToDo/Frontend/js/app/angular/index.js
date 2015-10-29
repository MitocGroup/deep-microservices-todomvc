'use strict';
'format es6';

import moduleName from './name';

import '../../../node_modules/todomvc-common/base.css!'
import '../../../node_modules/todomvc-app-css/index.css!'
import '../../../node_modules/todomvc-common/base.js'
import _ from '../../../node_modules/underscore/underscore'
import './module/index';
import './controllers/index';
import './services/index';
import './directives/index';

export default moduleName;
