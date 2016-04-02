(function() {
	'use strict';

	angular
		.module('app')
		.controller('SigninController', SigninController);

	/** @ngInject */
	function SigninController($mdDialog, AuthService) {
		var vm = this;

		vm.forget = AuthService.forget;
		vm.hide = function() {
			$mdDialog.hide();
		};
		vm.cancel = function() {
			$mdDialog.cancel();
		};
		vm.submit = function() {
			$mdDialog.hide();
		};
	}
})();