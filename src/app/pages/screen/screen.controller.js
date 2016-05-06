(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScreenController', ScreenController);

  /** @ngInject */
  function ScreenController($window, $mdDialog, toastr) {
    var vm = this;
  }
})();
