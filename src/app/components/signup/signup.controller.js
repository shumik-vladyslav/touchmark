(function() {
	'use strict';

	angular
		.module('app')
		.controller('SignupController', SignupController);

	/** @ngInject */
	function SignupController($mdDialog) {
		var vm = this;

		vm.hide = function() {
			$mdDialog.hide();
		};
		vm.cancel = function() {
			$mdDialog.cancel();
		};
		vm.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
})();