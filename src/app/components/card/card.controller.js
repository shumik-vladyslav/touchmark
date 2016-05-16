(function() {
	'use strict';

	angular
		.module('app')
		.controller('CardController', CardController);

	/** @ngInject */
	function CardController($scope, $mdDialog, AuthService, BottomSheetService) {
    var vm = this;
    vm.isHovered = false;
    vm.checked = false;
    vm.userInfo = AuthService.getUserInfo;
    vm.toggle = function() {
			vm.checked = !vm.checked;
			if(vm.checked){
				BottomSheetService.pushCheckedObject($scope.info);
			} else {
				BottomSheetService.deleteCheckedObject($scope.info);
			}
    };

    vm.toArchive = function() {
			$scope.info.archived = true;
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
        BottomSheetService.getBottomService().deletedProject($scope.info.id);
      });
		};
	}
})();
