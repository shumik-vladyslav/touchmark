(function() {
	'use strict';

	angular
		.module('app')
		.controller('CardController', CardController);

	/** @ngInject */
	function CardController($scope, BottomSheetService, ProjectsService) {
        var vm = this;
        vm.isHovered = false;
        vm.checked = false;
        vm.toggle = function() {
       		vm.checked = !vm.checked;
			if(vm.checked){
				BottomSheetService.pushCheckedObject($scope.info);
			}else{
				BottomSheetService.deleteCheckedObject($scope.info);
			}
			BottomSheetService.showBottomSheet();
        };
	
		vm.delete = function () {
			if (confirm('Are you sure you want to deleted project?')) {
				ProjectsService.deletedProject($scope.info.id);
			}
		};
		vm.socialButton = BottomSheetService.getSocialButtonValue(vm);

	}
})();