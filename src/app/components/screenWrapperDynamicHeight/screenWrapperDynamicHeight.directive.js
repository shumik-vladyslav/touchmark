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
        var setScreenSize = function(){
          $(element).height($(window).height() - 64 - 150);
        }();
        $(window).resize(setScreenSize);
      }
    };
    return directive;
  }
})();
