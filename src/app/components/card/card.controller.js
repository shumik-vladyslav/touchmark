(function() {
	'use strict';

	angular
		.module('app')
		.controller('CardController', CardController);

	/** @ngInject */
	function CardController() {
        var vm = this;
        vm.isHovered = false;
	}
})();