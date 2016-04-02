(function() {
	'use strict';

	angular
		.module('app')
		.controller('ForgetController', ForgetController);

	/** @ngInject */
	function ForgetController($mdDialog, AuthService, toastr) {
		var vm = this;
		vm.hide =  $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;

		function submit() {
			if(AuthService.rememberPassword(vm.email)) {
				$mdDialog.hide();	
			} else {
				toastr.error('User not found', 'Forget');
			}
		}
	}
})();