/* global System */
'use strict';
'format es6';

var deepKernel = DeepFramework.Kernel;

System.config({
  defaultJSExtensions: true,
});

deepKernel.loadFromFile('_config.json', function() {
  var bootstrapScripts = deepKernel.get('deep_frontend_bootstrap_vector');
  var scripts = [];
  var mNames = [];
  var modules = [];
  var config = [];
  var loadFirst = [];

  bootstrapScripts.map(function(m) {
    scripts.push(Promise.resolve(System.import(m)).then(function(module) {
      // collect angular modules
      var moduleName = module.default.name;
      mNames.push(moduleName);
      modules.push(module.default);

      if (typeof module.loadFirst === 'function') {
        loadFirst.push(module.loadFirst);
      }

      if (typeof module.configLoad === 'function') {
        config.push(module.configLoad);
      }
    }));
  });

  Promise.all(scripts).then(afterBootstrapLoad);

  function afterBootstrapLoad() {
    var configPromise = [];
    
    for (var callback of config) {
      if (typeof callback === 'function') {
        configPromise.push(Promise.resolve(callback()));
      }
    }

    Promise.all(configPromise).then(afterConfigLoad);
  }

  function afterConfigLoad() {
    var loadFirstPromise = [];
    
    for (var callback of loadFirst) {
      if (typeof callback === 'function') {
        loadFirstPromise.push(Promise.resolve(callback()));
      }
    }

    Promise.all(loadFirstPromise).then(afterLoadFirst);
  }

  function afterLoadFirst() {
    System.import('/js/lib/angular.js').then(function(angular) {
      System.set('angular', System.newModule(angular));
      System.import('/js/lib/angular-ui-router.js').then(afterAngularLoad);
    });
  }

  function afterAngularLoad() {
    System.set('angular-ui-router', System.newModule(angular.module('ui.router')));
    var moduleScripts = [];
    
    for (var callback of modules) {
      if (typeof callback === 'function') {
        moduleScripts.push(Promise.resolve(callback()));
      }
    }

    Promise.all(moduleScripts).then(function() {
      System.import('/js/app/module/index').then(function(m) {
        m.registerModules(mNames);
        System.import('/js/app/index').then(function(m) {
          m.bootstrap();
        }).catch(function(reason) {
          deepKernel.container.get('log').log(reason);
        });
      });
    });
  }
});
