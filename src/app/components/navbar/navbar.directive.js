(function() {
  'use strict';

  angular
    .module('touchMark')
    .directive('navBar', navBar);

  /** @ngInject */
  function navBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

    }
  }

})();
