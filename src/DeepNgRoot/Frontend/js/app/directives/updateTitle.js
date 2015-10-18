import moduleName from '../name';

export default
angular.module(moduleName)
  .directive('updateTitle', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var title = 'It works!';
          if (toState.data && toState.data.pageTitle) {
            title = toState.data.pageTitle;
          }

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      },
    };
  },
]);
