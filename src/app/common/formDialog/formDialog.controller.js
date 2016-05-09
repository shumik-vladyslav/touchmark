(function() {
	'use strict';

	angular
		.module('app')
		.controller('FormDialogController', FormDialogController);



	/** @ngInject */
	function FormDialogController($mdDialog) {
		var vm = this;
		vm.submit = function() {
      $mdDialog.hide(vm.result);
		};

    vm.cancel = function(){
      $mdDialog.cancel();
    };

	}
})();
