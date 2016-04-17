(function() {
	'use strict';

	angular
		.module('app')
		.controller('CardController', CardController);

	/** @ngInject */
	function CardController($scope, BottomSheetService) {
        var vm = this;
	
        vm.isHovered = false;
        vm.checked = false;
        vm.toggle = function() {
       		vm.checked = !vm.checked;
		BottomSheetService.showBottomSheet();
		BottomSheetService.pushCheckedObject($scope.info);
        };
	}
})();