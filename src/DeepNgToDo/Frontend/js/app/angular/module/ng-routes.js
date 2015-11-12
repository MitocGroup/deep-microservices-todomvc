'use strict';
'format es6';

import moduleName from '../name';

var deepAsset = DeepFramework.Kernel.container.get('asset');
var routes = {
  'app': {
    url: '/:status',
    controller: 'DeepNgToDoController',
    controllerAs: 'todoCtrl',
    templateUrl: deepAsset.locate('@deep.ng.todo:js/app/angular/views/todo.html'),
    data: {
      pageTitle: 'DEEP Framework • TodoMVC',
    },
  },
};

class Config {
  constructor($stateProvider, $urlRouterProvider) {
    /* Define application level routes */
    let stateNames = Object.keys(routes);
    $urlRouterProvider.otherwise('/');
    angular.forEach(stateNames, function routesRegister(stateName) {
      $stateProvider.state(stateName, routes[stateName]);
    });
  }
}

angular.module(moduleName).config(['$stateProvider', '$urlRouterProvider', (...args) => {
  return new Config(...args);
},]);

export default routes;

