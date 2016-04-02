(function() {
  'use strict';

  angular
    .module('app')
    .directive('navBar', navBar);

  /** @ngInject */
  function navBar() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/common/layouts/navbar/navbar.html',
      controller: 'NavbarController',
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;
  }

})();
