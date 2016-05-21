(function() {
  'use strict';

  angular
    .module('app')
    .directive('screenWrapperDynamicHeight', screenWrapperDynamicHeight); 

  /** @ngInject */
  function screenWrapperDynamicHeight($window) {
    var directive = {
      restrict: 'A',
      link: function(scope, element){
        var el = angular.element;
        var setScreenSize = function(){
          element.css('height', $window.innerHeight - 278 + 'px');
        };
        setScreenSize();

        el($window).bind('resize', function(){
          setScreenSize();
          scope.$digest();
        });
      }
    };
    return directive;
  }
})();
