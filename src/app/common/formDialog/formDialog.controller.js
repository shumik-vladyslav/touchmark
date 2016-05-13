(function() {
	'use strict';

	angular
		.module('app')
    .directive('validators', function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        terminal: true,
        controller: function($scope, $element){
          angular.forEach($scope.item.validators, function(key, value){
            $element.attr(value, key);
          });
        }
      };
    })
		.controller('FormDialogController', FormDialogController);



	/** @ngInject */
	function FormDialogController($mdDialog) {
		var vm = this;

    vm.opt = function($element){
      console.log($element);
    };

		vm.submit = function() {
      $mdDialog.hide(vm.result);
		};

    vm.cancel = function(){
      $mdDialog.cancel();
    };

	}
})();
