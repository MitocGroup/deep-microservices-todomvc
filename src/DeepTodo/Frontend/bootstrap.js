/* global System */
'use strict';
'format es6';

export default function todo() {
  var deepAsset = DeepFramework.Kernel.container.get('asset');
  return System.import(deepAsset.locate('@deep.todo:js/app/angular/index.js'));
}
