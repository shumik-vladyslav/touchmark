(function() {
	'use strict';

	angular
		.module('app')
		.controller('ForgetController', ForgetController);

	/** @ngInject */
	function ForgetController($mdDialog) {
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