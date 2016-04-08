(function() {
  'use strict';

  angular
    .module('app')
    .directive('filters', filters);

  /** @ngInject */
  function filters() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/filters/filters.modal.html',
      controller: 'FiltersController',
      controllerAs: 'filters',
      scope: {
            settings: '=',
            search: '='
      },
    };

    return directive;
  }

})();
