/* global System */
'use strict';
'format es6';

export function configLoad() {
  return System.import('/deep-todomvc/js/config.core.js');
}

export default function todo() {
  return System.import('/deep-todomvc/js/app/angular/index.js');
}
