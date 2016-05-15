(function() {
	'use strict';

	angular
		.module('app')
		.controller('BottomSheetController', BottomSheetController);

	/** @ngInject */
	function BottomSheetController(BottomSheetService, ProjectsService, $mdBottomSheet, $mdDialog) {
    var vm = this;
    vm.sheetValue = ProjectsService.getSheetValue();
    vm.socialButton = ProjectsService.getSocialButtonValue(vm);
    
    vm.selectedObject = BottomSheetService.getSelectedObject();
    vm.status = ProjectsService.getStatus();

    vm.listItemClick = function($index) {
      var clickedItem = vm.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };

    if(vm.selectedObject.length > 1){
      $mdBottomSheet.cancel();
    }

    vm.delete = function (ev) {
      $mdDialog.show({
        controller: 'DialogModalController',
        controllerAs:'dialog',
        templateUrl: 'app/components/dialog/dialog.modal.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(function() {
        for (var key in vm.selectedObject) {
          if (vm.selectedObject.hasOwnProperty(key)) {
            var element = vm.selectedObject[key];
            ProjectsService.deletedProject(element.id);
          }
        }
        BottomSheetService.deleteCheckedObjects();

        vm.selectedObject = BottomSheetService.getSelectedObject();

        BottomSheetService.showBottomSheet();
      });
    };

    vm.update = function(value){
      for (var key in vm.selectedObject) {
        if (vm.selectedObject.hasOwnProperty(key)) {
          var element = vm.selectedObject[key];
          ProjectsService.updateValue(element.id, 'status', value);
        }
      }
      vm.selectedObject = BottomSheetService.getSelectedObject();
    };

  }
})();
