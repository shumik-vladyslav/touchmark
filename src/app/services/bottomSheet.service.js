(function() {
	'use strict';

	angular
		.module('app')
		.factory('BottomSheetService', BottomSheetService);

	/** @ngInject */
	function BottomSheetService($mdBottomSheet) {
    var vm = this;
    var showBottomFlag = true;

    vm.selectedObject = [];
    var service = {
      showBottomSheet: showBottomSheet,
      getSheetValue: getSheetValue,
      pushCheckedObject: pushCheckedObject,
      deleteCheckedObject: deleteCheckedObject,
      getSocialButtonValue: getSocialButtonValue,
      getSelectedObject: getSelectedObject,
      deleteCheckedObjects: deleteCheckedObjects
    };

    return service;

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

    function getSocialButtonValue(param) {
      var arr = [
        {label: 'Share', svg: 'assets/icons/share.svg'},
        {label: 'Copy', svg: 'assets/icons/copy.svg'},
        {label: 'Archive', svg: 'assets/icons/archive.svg'},
        {label: 'Delete', svg: 'assets/icons/delete.svg', click: param.delete}
      ];

      return arr;
    }

    function getSheetValue() {

      var changeStatus = [
        {key: 'DUPLICATE', action: '/'}
      ];

      var copyToPrototype = [
        {key: 'NEW PROTOTYPE', action: '/'},
        {key: 'PROTOTYPE 1', action: '/'},
        {key: 'PROTOTYPE 2', action: '/'}
      ];

      var moveToSection = [
        {key: 'DUPLICATE', action: '/'}
      ];

      var arr = [
        {key: 'DUPLICATE', action: '/'},
        {key: 'CHANGE STATUS', value: changeStatus},
        {key: 'COPY TO PROTOTYPE', value: copyToPrototype},
        {key: 'MOVE TO SECTION', value: moveToSection}
      ];

      return arr;
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
