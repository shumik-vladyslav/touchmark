(function() {
  'use strict';

  angular
    .module('app')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController(AuthService, NavService) {
    var vm = this;
    vm.theme = theme;
    vm.signIn = AuthService.signIn;
    vm.signUp = AuthService.signUp;
    vm.menu = NavService.navMenu;
    vm.logOut = logOut;
    vm.isAuthorized = AuthService.isAuthorized;
    vm.userInfo = AuthService.getUserInfo;

    vm.isOpen = false;
    vm.selectedDirection = 'down';
    vm.selectedMode = 'md-fling';
    function logOut() {
      AuthService.logOut();
      theme();
    }

    function theme() {
      if(AuthService.isAuthorized()) {
        return 'navAuth';
      } else {
        return 'navGuest';
      }
    }
  }
})();
