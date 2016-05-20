(function() {
	'use strict';

	angular
		.module('app')
		.controller('FormDialogController', FormDialogController);



	/** @ngInject */
	function FormDialogController($mdDialog) {
		var vm = this;

    vm.runAction = function($ev, action, data){
      vm.cancel();
      action($ev, data);
    };

		vm.submit = function() {
      $mdDialog.hide(vm.result);
		};

    vm.cancel = function(){
      $mdDialog.cancel();
    };

	}
})();
