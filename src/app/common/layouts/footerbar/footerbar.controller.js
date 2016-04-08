(function() {
	'use strict';

	angular
		.module('app')
		.controller('FooterbarController', FooterbarController);

	/** @ngInject */
	function FooterbarController(NavService) {
		var vm = this;
		vm.cols = NavService.getFooterMenu();
		vm.socials = NavService.getSocials();
	}
})();