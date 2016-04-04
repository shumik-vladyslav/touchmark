(function() {
  'use strict';

  angular
    .module('app')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($scope, AuthService, NavService) {
    var vm = this;
    vm.theme = theme;
    vm.signIn = AuthService.signIn;
    vm.signUp = AuthService.signUp;
    vm.menu = NavService.navMenu;
    vm.logOut = AuthService.logOut;
    vm.isAuthorized = AuthService.isAuthorized;
    vm.userInfo = AuthService.getUserInfo;

    function theme() {
      if(AuthService.isAuthorized()) {
        return 'navAuth';
      } else {
        return 'navGuest';
      }
    }
  }
})();