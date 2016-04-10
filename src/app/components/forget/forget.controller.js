(function() {
	'use strict';

	angular
		.module('app')
		.controller('ForgetController', ForgetController);

	/** @ngInject */
	function ForgetController($mdDialog, AuthService, toastr) {
		var vm = this;
		vm.user = {};
		vm.hide =  $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;

		function submit(ev) {
			var password = AuthService.rememberPassword(vm.user.email);
			if(password) {
				toastr.info(password, 'Your password!');
				$mdDialog.hide(ev);	
			} else {
				toastr.error('User not found', 'Forget');
			}
		}
	}
})();