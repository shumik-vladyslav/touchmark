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
    /* end mock data */


    /* helper functions */
    vm.goToScreen = function(uuid){
      $state.params.uuid = uuid;
      $state.go($state.current.name, $state.params, {reload: true});
    };
    /**/


    /* mode actions */
    vm.activeMode = 0;
    vm.toggleMode = function(mode){
      vm.activeMode = mode;
    };
    /**/


    /* INITIAL VALUES FOR THE ZOOM PLUGIN CONFIGS */
    vm.scale = 100;
    vm.zoomConfig = {
      modelChangedCallback: function(obj){
        $timeout(function(){
          vm.scale = 400 / Math.pow(2, obj.zoomLevel);
        });
      },
      initialPanX: 0 // will be changed to when the image is downloaded
    };
    vm.zoomModel = {}; // always pass empty object
    /**/


    /* our configs */
    vm.useAbsoluteSizes = true;
    /**/


    // watch while the project is available. maybe it should be downloaded from the remote server
    $scope.$watch('vm.current', function(){
      var img = new Image();
      // HERE WE CAN DO LOADER
      img.onload = function(){
        vm.ww = $(window).width();
        vm.iw = this.width; // image width
        vm.ih = this.height // image height
        if (vm.ww > vm.iw){
          vm.zoomConfig.initialPanX = (vm.ww - vm.iw) / 2;
        }
        vm.showImage = true;
        $scope.$digest();
      };
      img.src = vm.current.url;
    }, true)
    /**/


    /* pins actions */
    vm.selectPin = function(pin, e){
      vm.selectedPin = pin;
      vm.scrollPinComments(pin);
      if (e){
        e.stopPropagation();
      }
    };
    vm.unselectPin = function(){
      vm.selectedPin = null;
    };
    vm.isPinSelected = function(pin){
      return pin == vm.selectedPin;
    };
    vm.scrollPinComments = function(pin){
      var pinIndex = vm.pins.indexOf(pin);
      if (pinIndex > -1){
        $timeout(function(){
          var targetEl = $('#pin-' + pinIndex).find('.pin-content-comment');
          targetEl.scrollTop(targetEl[0].scrollHeight);
        });
      }
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

    vm.clearNewComment = function(pin){
      pin.newComment = {};
    };

    vm.addComment = function(pin){
      pin.newComment.user = vm.user;
      pin.comments.push(angular.copy(pin.newComment));
      vm.clearNewComment(pin);
      vm.cancelNewCommentMode(pin);
    };

    vm.containerClick = function($event){
      if (vm.canBeAddedNewPin()){
        var coords = vm.getMouseCoords($event);
        var newPin = { id: null, x: coords.x, y: coords.y, type: 2, comments: [] };
        vm.pins.push(newPin);
        $timeout(function(){
          vm.selectPin(newPin);
          vm.startNewCommentMode(newPin);
        });
      }
    };
    /* end pins actions */


    /* common */
    vm.getMouseCoords = function($event){
      return  vm.convertCoords({x: ($event.offsetX) / vm.iw * 100, y: ($event.offsetY) / vm.ih * 100});
    };

    vm.convertCoords = function(coords){
      return {x: coords.x * (vm.scale / 100), y: coords.y * (vm.scale / 100)};
    };

    vm.click = function(){
      if (vm.activeMode == 2){
        vm.unselectPin();
      }
    };

    vm.mousemove = function($event){
      vm.mouseCoords = vm.getMouseCoords($event);
    };
    vm.mouseleave = function(){
      vm.mouseInside = false;
    };
    vm.mouseenter = function(){
      vm.mouseInside = true;
    };

    vm.canBeAddedNewPin = function(){
      return (vm.activeMode == 2) && vm.mouseInside && !vm.selectedPin;
    };
    /**/

  }
})();
