/**
 * Created by Stefan Hariton on 6/24/15.
 */

'use strict';

if (typeof Symbol === 'undefined') {
  require('babel-core/polyfill');
}

import DeepFramework from '@mitocgroup/deep-framework';
import Handler from './Handler';

exports.handler = function(event, context) {
  DeepFramework.Kernel.loadFromFile('_config.json', function() {
    new Handler().run(event, context);
  });
};
