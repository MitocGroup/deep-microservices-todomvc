'use strict';
'format es6';

import moduleName from '../name';

var deepAsset = DeepFramework.Kernel.container.get('asset');
var routes = {
  'app': {
    url: '',
    templateUrl: deepAsset.locate('@deep-todomvc:js/app/angular/views/layout.html'),
    controller: 'DeepTodoController',
    controllerAs: 'todoCtrl',
    data: {
      pageTitle: 'DEEP Framework • TodoMVC'
    }
  },
  'app.todo': {
    url: '/:status',
    views: {
      'todo': {
        controller: 'DeepTodoStateController',
        templateUrl: deepAsset.locate('@deep-todomvc:js/app/angular/views/todo.html')
      }
    }
  }
};

class Config {
  constructor($stateProvider, $urlRouterProvider) {
    /* Define application level routes */
    let stateNames = Object.keys(routes);
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');
    angular.forEach(stateNames, function routesRegister(stateName) {
      $stateProvider.state(stateName, routes[stateName]);
    });
  }
}

angular.module(moduleName).config(
  ['$stateProvider', '$urlRouterProvider', (...args) => {
    return new Config(...args);
  }]
);

export default routes;
