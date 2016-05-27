(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScreenController', ScreenController);

  /** @ngInject */
  function ScreenController($state, $scope, $timeout, PanZoomService) {
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

    vm.current = vm.screens.filter(function(scr){ return scr.id == vm.currentId; })[0];

    vm.project = {
      id: 'project-id',
      name: 'My project'
    };

    vm.user = { id: 2, username: "my_username" };

    vm.pins = [
      {
        id: 1, x: 2.3, y: 3, type: 2, comments:[
          { user: { id: 2, username: "my_username" }, message: "text text text1" },
          { user: { id: 2, username: "my_username" }, message: "text text text2" },
          { user: { id: 2, username: "my_username" }, message: "text text text3" },
          { user: { id: 2, username: "my_username" }, message: "text text text4" },
          { user: { id: 2, username: "my_username" }, message: "text text text5" }
        ]
      }
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


    /* pins actions */
    vm.selectPin = function(pin, e){
      vm.selectedPin = pin;
      e.stopPropagation();
    };
    vm.unselectPin = function(){
      vm.selectedPin = null;
    };
    vm.isPinSelected = function(pin){
      return pin == vm.selectedPin;
    };

    vm.startNewCommentMode = function(pin){
      pin.newCommentMode = true;
    };
    vm.cancelNewCommentMode = function(pin){
      pin.newCommentMode = false;
    };
    vm.isNewCommentMode = function(pin){
      return pin.newCommentMode;
    };

    vm.addComment = function(pin){
      pin.newComment.user = vm.user;
      pin.comments.push(angular.copy(pin.newComment));
      vm.cancelNewCommentMode(pin);
    };
    /* end pins actions */

    /* common */
    vm.click = function(){
      if (vm.activeMode == 2){
        vm.unselectPin();
      }
    };
    vm.mousemove = function($event){
      //PanZoomService.getAPI('pane').then(function (api) {
      // you can now invoke the api
      //});
      console.log([$event.offsetX, $event.offsetY]);
    };
    /*  */

  }
})();
