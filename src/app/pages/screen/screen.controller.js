(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScreenController', ScreenController);

  /** @ngInject */
  function ScreenController($state, $scope, $timeout) {
    var vm = this;

    /* initial data */
    vm.currentId = $state.params.uuid

    /* some mock data */
    vm.screens = [
      {
        id: 'screen-id1',
        name: 'home.png',
        url: 'https://s3-eu-west-1.amazonaws.com/cdn.webfactore.co.uk/web_design_example_717_large.jpg'
      },
      {
        id: 'screen-id2',
        name: 'screen.png',
        url: 'http://img.docstoccdn.com/thumb/orig/167869913.png'
      }
    ];

    console.log("I'm HERE!");

    vm.current = vm.screens.filter(function(scr){ return scr.id == vm.currentId; })[0];

    vm.project = {
      id: 'project-id',
      name: 'My project'
    };

    vm.pins = [
      { id: 1, x: 12.3, y: 44, type: 1, comments:[ { user: { id: 2, username: "my_username" }, message: "text text text" } ] }
    ];    

    /* helper functions */
    vm.goToScreen = function(uuid){
      $state.params.uuid = uuid;
      $state.go($state.current.name, $state.params, {reload: true});
    };

    /* mode actions */
    vm.activeMode = 0;
    vm.toggleMode = function(mode){
      vm.activeMode = mode;
    };

    vm.zoomConfig = {
      modelChangedCallback: function(obj){
        $timeout(function(){
          vm.scale = 400 / Math.pow(2, obj.zoomLevel);
        });
      }
    };
    vm.zoomModel = {}; // always pass empty object

    vm.useAbsoluteSizes = true;

  }
})();
