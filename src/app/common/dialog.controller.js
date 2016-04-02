(function() {
  'use strict';

  angular
    .module('app')
    .controller('DialogController', DialogController);

  /** @ngInject */
  function DialogController($mdDialog) {
    var vm = this;

    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})();