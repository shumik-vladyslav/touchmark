(function(){
  'use strict';

  angular
    .module('app')
    .directive('validators', Validators);

  /** @ngInject */
  function Validators($compile) {
    return {
      restrict: 'A',
      terminal:true,
      priority:1000,
      link: function ($scope, element) {
        angular.forEach($scope.item.validators, function(value, key){
          element.attr(key, value);
        });
        element.removeAttr('validators');
        $compile(element)($scope);
      }
    };
  }
})();
