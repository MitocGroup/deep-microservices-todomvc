/**
 * Created by Stefan Hariton on 7/8/15.
 */

'use strict';

if (typeof Symbol === 'undefined') {
  require('babel-polyfill');
}

import DeepFramework from 'deep-framework';
import Handler from './Handler';

exports.handler = function(event, context) {
  DeepFramework.Kernel.loadFromFile('_config.json', function() {
    new Handler().run(event, context);
  });
};
