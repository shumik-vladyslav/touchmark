(function() {
	'use strict';

	angular
		.module('app')
		.controller('CardController', CardController);

	/** @ngInject */
	function CardController($scope, $mdDialog, $document, BottomSheetService, ProjectsService) {
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
					ProjectsService.deletedProject($scope.info.id);
				}, function() {
				});
		};
		vm.socialButton = BottomSheetService.getSocialButtonValue(vm);

	}
})();