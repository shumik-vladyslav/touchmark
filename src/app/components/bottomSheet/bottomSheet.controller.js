(function() {
	'use strict';

	angular
		.module('app')
		.controller('BottomSheetController', BottomSheetController);

	/** @ngInject */
	function BottomSheetController(BottomSheetService, $mdBottomSheet) {
    var vm = this;
    vm.service = BottomSheetService.extService();
    vm.sheetValue = vm.service.getSheetValue();
    vm.socialButton = vm.service.getSocialButtonValue();
    
    vm.selectedObject = BottomSheetService.getSelectedObject();
    vm.status = vm.service.getStatus();

    vm.listItemClick = function($index) {
      var clickedItem = vm.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };

    if(vm.selectedObject.length > 1){
      $mdBottomSheet.cancel();
    }
  }
})();
