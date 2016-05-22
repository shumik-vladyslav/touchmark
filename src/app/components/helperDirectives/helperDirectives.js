(function() {
  'use strict';

  angular
    .module('app')
    .directive('scrollStopPropagation', scrollStopPropagation); 

  /** @ngInject */
  function scrollStopPropagation() {
    var directive = {
      restrict: 'A',
      link: function(scope, element) {
        var _onWheel = function(e) {
          e.stopPropagation();
        };

        element[0].addEventListener('DOMMouseScroll', _onWheel, false ); // For FF and Opera
        element[0].addEventListener('mousewheel', _onWheel, false ); // For others
      }
    };
    return directive;
  }
})();
