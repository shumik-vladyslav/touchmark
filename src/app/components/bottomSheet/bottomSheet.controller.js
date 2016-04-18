(function() {
	'use strict';

	angular
		.module('app')
		.controller('BottomSheetController', BottomSheetController);

	/** @ngInject */
	function BottomSheetController(NavService, BottomSheetService, $mdBottomSheet) {
        var vm = this;
        vm.sheetValue = BottomSheetService.getSheetValue();
        vm.socials = NavService.getSocials();
        
        vm.listItemClick = function($index) {
            var clickedItem = vm.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
	}
})();