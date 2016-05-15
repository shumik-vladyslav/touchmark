(function(){
  'use strict';

  angular
    .module('app')
    .directive('validators', Validators);

  /** @ngInject */
  function Validators() {
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: function($scope, $element){
        angular.forEach($scope.item.validators, function(key, value){
          $element.attr(value, key);
        });
      }
    };
  }
})();
