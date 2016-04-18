(function() {
	'use strict';

	angular
		.module('app')
		.controller('BottomSheetController', BottomSheetController);

	/** @ngInject */
	function BottomSheetController(BottomSheetService, ProjectsService, $mdBottomSheet) {
        var vm = this;
        vm.sheetValue = BottomSheetService.getSheetValue();
        vm.selectedObject = BottomSheetService.selectedObject;
        vm.status = ProjectsService.getStatus();
        
        this.listItemClick = function($index) {
            var clickedItem = this.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
        
        vm.delete = function () {
            if (confirm('Are you sure you want to deleted project?')) {
                for (var key in vm.selectedObject) {
                    if (vm.selectedObject.hasOwnProperty(key)) {
                        var element = vm.selectedObject[key];
                        ProjectsService.deletedProject(element.id);
                        
                    }
                }
                vm.selectedObject = BottomSheetService.selectedObject;
            }
	    };
        
        vm.update = function(value){
            for (var key in vm.selectedObject) {
                if (vm.selectedObject.hasOwnProperty(key)) {
                    var element = vm.selectedObject[key];
                    ProjectsService.updateValue(element.id, 'status', value);
                    
                }
            }
            vm.selectedObject = BottomSheetService.selectedObject;
        };
        
        vm.socialButton = BottomSheetService.getSocialButtonValue(vm);

	}
})();