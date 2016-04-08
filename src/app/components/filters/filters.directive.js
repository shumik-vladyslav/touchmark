(function() {
  'use strict';

  angular
    .module('app')
    .directive('filters', filters); // лучше назави filterBar

  /** @ngInject */
  function filters() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/filters/filters.modal.html', // почему у него в название modal есть? он только для шаблонов модального окна добавляется для идентификации, переименуй
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
