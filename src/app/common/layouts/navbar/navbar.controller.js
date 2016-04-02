(function() {
  'use strict';

  angular
    .module('app')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController(AuthService) {
    var vm = this;

    vm.signIn = AuthService.signIn;
    vm.signUp = AuthService.signUp;
  }
})();