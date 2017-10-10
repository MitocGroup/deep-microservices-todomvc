'use strict';
'format es6';

/* global angular */

import moduleName from '../name';

class DeepTodoStateController {

  /**
   * @param $scope
   * @param $stateParams
   */
  constructor($scope, $stateParams) {
    $scope.$on('$stateChangeSuccess', () => {
      let status = $scope.status = $stateParams.status || '';
      $scope.statusFilter = (status === 'active') ?
      { Completed: false } : (status === 'completed') ?
      { Completed: true } : {};
    });
  }
}

angular.module(moduleName).controller('DeepTodoStateController',
  ['$scope',  '$stateParams', (...args) => {
    return new DeepTodoStateController(...args);
  }]
);
