(function() {
  'use strict';

  angular
    .module('app')
    .directive('screenWrapperDynamicHeight', screenWrapperDynamicHeight); 

  /** @ngInject */
  function screenWrapperDynamicHeight() {
    var directive = {
      restrict: 'A',
      link: function(scope, element){
        element.css('height', window.innerHeight + 'px');
        // console.log("elem[0].offsetHeight");
        // console.log(elem[0].offsetHeight);
        // elem[0].offsetHeight = 120;
        // var $ = angular.element;
        // var setScreenSize = function(){
        //   $(element).height($(window).height() - 64 - 150);
        // }();
        // $(window).resize(setScreenSize);
      }
    };
    return directive;
  }
})();
