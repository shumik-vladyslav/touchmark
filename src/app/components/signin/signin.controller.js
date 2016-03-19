(function() {
	'use strict';

	angular
		.module('app')
		.controller('SigninController', SigninController);

	/** @ngInject */
	function SigninController($mdDialog) {
		var vm = this;

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