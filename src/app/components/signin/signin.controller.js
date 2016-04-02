(function() {
	'use strict';

	angular
		.module('app')
		.controller('SigninController', SigninController);

	/** @ngInject */
	function SigninController($mdDialog, AuthService) {
		var vm = this;
		vm.user = {};
		vm.forget = AuthService.forget;
		vm.hide = $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;
		
		function submit() {
			if(AuthService.checkUserExist(vm.user)) {
				$mdDialog.hide();
			}
		}
	}
})();