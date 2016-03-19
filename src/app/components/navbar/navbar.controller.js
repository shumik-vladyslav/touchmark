(function() {
  'use strict';

  angular
    .module('app')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController(AuthService, $mdDialog) {
    var vm = this;

    vm.signIn = AuthService.signIn;
  }
})();