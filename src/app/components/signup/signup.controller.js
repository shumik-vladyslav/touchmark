(function() {
	'use strict';

	angular
		.module('app')
		.controller('SignupController', SignupController);

	/** @ngInject */
	function SignupController($mdDialog, AuthService) {
		var vm = this;
		vm.user = {};
		vm.hide = $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;

		function submit() {
			if(AuthService.registerUser(vm.user)) {
				$mdDialog.hide();	
			}
		}
	}
})();