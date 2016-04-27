(function() {
  'use strict';

  angular
    .module('app')
    .directive('card', card);

  /** @ngInject */
  function card() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/card/card.html',
      controller: 'CardController',
      controllerAs: 'card',
      scope: {
        info: '='
      },
      transclude: {
        'mainAction': 'cardMainAction',
        'rightActions': '?cardRightActions'
      }
    };

    return directive;
  }

})();
