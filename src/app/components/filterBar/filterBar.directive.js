(function() {
  'use strict';

  angular
    .module('app')
    .directive('filterBar', filterBar); 

  /** @ngInject */
  function filterBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/filterBar/filterBar.html', 
      controller: 'FilterBarController',
      controllerAs: 'filters',
      scope: {
        settings: '=',
        search: '=',
        add: '='
      }
    };
    return directive;
  }
})();
