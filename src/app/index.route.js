(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/common/layouts/main.html'
      })
      .state('main.home', {
        url: '/',
        templateUrl: 'app/pages/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('main.pricing', {
        url: '/pricing',
        templateUrl: 'app/pages/pricing/pricing.html'
      })
      .state('main.about', {
        url: '/about',
        templateUrl: 'app/pages/about/about.html'
      })
      .state('main.showcase', {
        url: '/showcase',
        templateUrl: 'app/pages/showcase/showcase.html'
      })
      .state('main.support', {
        url: '/support',
        templateUrl: 'app/pages/support/support.html'
      })
      .state('main.projects', {
        url: '/projects',
        templateUrl: 'app/pages/projects/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'proj'
      })
      .state('main.uikit', {
        url: '/uikit',
        templateUrl: 'app/pages/uikit/uikit.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
