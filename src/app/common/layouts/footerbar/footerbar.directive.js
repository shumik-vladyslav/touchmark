(function() {
  'use strict';

  angular
    .module('app')
    .directive('footerBar', footerBar);

  /** @ngInject */
  function footerBar() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/common/layouts/footerbar/footerbar.html',
      controller: 'FooterbarController',
      controllerAs: 'footerbar',
      bindToController: true
    };

    return directive;
  }

})();
