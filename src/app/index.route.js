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
        controllerAs: 'main',
        freePage: true
      })
      .state('main.pricing', {
        url: '/pricing',
        templateUrl: 'app/pages/pricing/pricing.html',
        controller: 'PricingController',
        controllerAs: 'pric',
        freePage: true
      })
      .state('main.about', {
        url: '/about',
        templateUrl: 'app/pages/about/about.html',
        freePage: true
      })
      .state('main.showcase', {
        url: '/showcase',
        templateUrl: 'app/pages/showcase/showcase.html',
        freePage: true
      })
      .state('main.support', {
        url: '/support',
        templateUrl: 'app/pages/support/support.html',
        freePage: true
      })
      .state('main.projects', {
        url: '/projects',
        templateUrl: 'app/pages/projects/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'proj'
      })
      .state('main.screens', {
        url: '/screens/:screens',
        templateUrl: 'app/pages/screens/screens.html',
        controller: 'ScreensController',
        controllerAs: 'proj'
      })
      .state('main.screen', {
        url: '/screen/:screen',
        templateUrl: 'app/pages/screen/screen.html',
        controller: 'ScreenController',
        controllerAs: 'screen'
      })
      .state('main.boards', {
        url: '/boards',
        templateUrl: 'app/pages/boards/boards.html'
      })
      .state('main.activity', {
        url: '/activity',
        templateUrl: 'app/pages/activity/activity.html'
      })
      .state('main.people', {
        url: '/people',
        templateUrl: 'app/pages/people/people.html'
      })
      .state('main.learn', {
        url: '/learn',
        templateUrl: 'app/pages/learn/learn.html'
      })
      .state('main.contact', {
        url: '/contact',
        templateUrl: 'app/pages/contact/contact.html',
        freePage: true
      })
      .state('main.privacy', {
        url: '/privacy',
        templateUrl: 'app/pages/privacy/privacy.html',
        freePage: true
      })
      .state('main.terms', {
        url: '/terms',
        templateUrl: 'app/pages/terms/terms.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
