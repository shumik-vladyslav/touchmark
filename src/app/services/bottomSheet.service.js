(function() {
	'use strict';

	angular
		.module('app')
		.factory('BottomSheetService', BottomSheetService);

	/** @ngInject */
	function BottomSheetService($mdBottomSheet) {
    var vm = this;
    var showBottomFlag = true;
    vm.bottomService = null;

    vm.selectedObject = [];
    var service = {
      setBottomService: setBottomService,
      extService: extService,
      showBottomSheet: showBottomSheet,     
      pushCheckedObject: pushCheckedObject,
      deleteCheckedObject: deleteCheckedObject,
      getSelectedObject: getSelectedObject,
      deleteCheckedObjects: deleteCheckedObjects
    };

    return service;
    
    function setBottomService(service) {
      vm.bottomService = service;
    }
    
    function extService() {
      return vm.bottomService;
    }
    
    function getSelectedObject() {
      return vm.selectedObject;
    }

    function pushCheckedObject(obj) {
      vm.selectedObject.push(obj);
      if(showBottomFlag && vm.selectedObject.length > 0) {
        showBottomFlag = false;
        showBottomSheet();
      }
    }

    function deleteCheckedObject(obj) {
      vm.selectedObject.forEach(function(item, i, arr){
        if(item.id === obj.id){
          arr.splice(i, 1);
        }
      });
      if(vm.selectedObject.length < 1){
        $mdBottomSheet.hide();
        showBottomFlag = true;
      }
    }

    function deleteCheckedObjects() {
      vm.selectedObject = [];
      $mdBottomSheet.cancel();
    }

    function showBottomSheet() {
      $mdBottomSheet.show({
        templateUrl: 'app/components/bottomSheet/bottomSheet.html',
        controller: 'BottomSheetController',
        controllerAs: 'bott',
        clickOutsideToClose: false,
        disableParentScroll : false,
        disableBackdrop: true
      });
    }
  }
})();
