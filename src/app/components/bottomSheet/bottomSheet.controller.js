(function() {
	'use strict';

	angular
		.module('app')
		.controller('BottomSheetController', BottomSheetController);

	/** @ngInject */
	function BottomSheetController(NavService, BottomSheetService, $mdBottomSheet) {
        var vm = this;
        vm.sheetValue = BottomSheetService.getSheetValue();
        vm.selectedObject = BottomSheetService.selectedObject;
        vm.socials = NavService.getSocials();
        
        this.listItemClick = function($index) {
            var clickedItem = this.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
	}
})();