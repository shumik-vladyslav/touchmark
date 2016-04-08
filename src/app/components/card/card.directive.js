(function() {
  'use strict';

  angular
    .module('app')
    .directive('card', card);

  /** @ngInject */
  function card() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/card/card.modal.html',
      controller: 'CardController',
      controllerAs: 'card',
      scope: {
            name: '=',
            time: '=',
            img: '=',
      },
    };

    return directive;
  }

})();
