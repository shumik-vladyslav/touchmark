(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($mdIconProvider) {
    $mdIconProvider
       .defaultIconSet('bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
       .iconSet('content', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
       .iconSet('social', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg');
  }

})();
