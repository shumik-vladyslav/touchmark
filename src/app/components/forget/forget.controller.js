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
			var password = AuthService.rememberPassword(vm.email);
			if(password) {
				toastr.info(password, 'Forget');
				$mdDialog.hide();	
			} else {
				toastr.error('User not found', 'Forget');
			}
		}
	}
})();