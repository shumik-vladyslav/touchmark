(function() {
	'use strict';

	angular
		.module('app')
		.controller('SigninController', SigninController);

	/** @ngInject */
	function SigninController($mdDialog, AuthService) {
		var vm = this;
		vm.user = {
			email: 'user1@mail.com',
			password: 'User1'
		};
		vm.forget = AuthService.forget;
		vm.hide = $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;
		vm.demoUser = AuthService.demoUser;
		
		function submit(ev) {
			if(AuthService.checkUserExist(vm.user)) {
				$mdDialog.hide(ev);
			}
		}
	}
})();