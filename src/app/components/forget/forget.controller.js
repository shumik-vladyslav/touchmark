(function() {
	'use strict';

	angular
		.module('app')
		.controller('ForgetController', ForgetController);

	/** @ngInject */
	function ForgetController($mdDialog, AuthService, toastr) {
		var vm = this;
		vm.hide =  hide;
		vm.cancel = cancel;
		vm.submit = submit;

		function hide() {
			$mdDialog.hide();
		}

		function cancel() {
			$mdDialog.cancel();
		}

		function submit() {
			if(AuthService.rememberPassword(vm.email)) {
				$mdDialog.hide();	
			} else {
				toastr.error('User not found', 'Forget');
			}
		}
	}
})();