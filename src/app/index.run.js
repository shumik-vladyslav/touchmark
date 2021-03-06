(function () {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /* jshint ignore:start */
  // jscs:disable
  /* eslint-disable */
  /** @ngInject */
  function runBlock($log, $rootScope, $state, $timeout, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, data) {
      if (!data.freePage && !AuthService.isAuthorized()) {
        $timeout(function () {
          $state.go('main.home');
        }, 0);
      }
    });
    $log.debug('runBlock end');
  }
  /* eslint-enable */
  // jscs:enable
  /* jshint ignore:end */
})();
