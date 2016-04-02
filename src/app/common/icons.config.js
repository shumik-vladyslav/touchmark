(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($mdIconProvider) {
    $mdIconProvider
       .defaultIconSet('icons/svg-sprite-action.svg')
       .iconSet('content', 'icons/svg-sprite-content.svg')
       .iconSet('social', 'icons/svg-sprite-social.svg');
  }

})();
