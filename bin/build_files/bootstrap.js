'use strict';
'format es6';

var deepKernel = DeepFramework.Kernel;

System.config({
  defaultJSExtensions: true,
});

DeepFramework.Kernel.bootstrap(function(deepKernel) {
  System.import('js/config.core.js').then(function(m) {
    System.import('/index').then(function(m) {
      m.registerModules(['todo']);
      m.bootstrap();
    }).catch(function(reason) {
      deepKernel.container.get('log').log(reason);
    });
  }).catch(function(reason) {
    deepKernel.container.get('log').log(reason);
  });
});
