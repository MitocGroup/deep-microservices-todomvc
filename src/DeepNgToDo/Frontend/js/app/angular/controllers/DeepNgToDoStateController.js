'use strict';
'format es6';

/* global DeepFramework */
/* global angular */

import moduleName from '../name';

class DeepNgToDoStateController {

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

angular.module(moduleName).controller('DeepNgToDoStateController',
  ['$scope',  '$stateParams', (...args) => {
    return new DeepNgToDoStateController(...args);
  },]

);