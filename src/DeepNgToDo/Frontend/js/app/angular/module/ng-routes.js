'use strict';
'format es6';

import moduleName from '../name';

var deepAsset = DeepFramework.Kernel.container.get('asset');
var routes = {
  app: {
    url: '',
    controller: 'DeepNgToDoController',
    controllerAs: 'todoCtrl',
    templateUrl: deepAsset.locate('@deep.ng.todo:js/app/angular/views/todo.html')
  }
};

class Config {
  constructor($stateProvider) {
    /* Define application level routes */
    let stateNames = Object.keys(routes);
    angular.forEach(stateNames, function routesRegister(stateName) {
      $stateProvider.state(stateName, routes[stateName]);
    });
  }
}

Config.$inject = ['$stateProvider'];

angular.module(moduleName).config(['$stateProvider', function($stateProvider) {
  return new Config($stateProvider);
},]);

export default routes;

