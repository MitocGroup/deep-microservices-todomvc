/* global System */
'use strict';

function configLoad() {
  return System.import('/deep-todomvc/js/config.core.js');
}

function todo() {
  return System.import('/deep-todomvc/js/app/angular/index.js');
}

module.exports = {
  configLoad: configLoad,
  default: todo
};
