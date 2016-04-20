(function() {
	'use strict';

	angular
		.module('app')
		.factory('BottomSheetService', BottomSheetService);

	/** @ngInject */
	function BottomSheetService($mdBottomSheet, $mdToast) {
        
        var vm = this;
        var showBottomFlag = true;
        
        var selectedObject = [];
        
		var service = {
            showBottomSheet: showBottomSheet,
            getSheetValue: getSheetValue,
            pushCheckedObject: pushCheckedObject,
            deleteCheckedObject: deleteCheckedObject,
            getSocialButtonValue: getSocialButtonValue,
            selectedObject: selectedObject
		};

		return service;
        
        function pushCheckedObject(obj) {
            selectedObject.push(obj);
        }
        
        function deleteCheckedObject(obj) {
            selectedObject.forEach(function(item, i, arr){
				if(item.id === obj.id){
					arr.splice(i, 1);
				}
			});
        }
        
        function getSocialButtonValue(param) {
            var arr = [
                {label: 'Share', svg: 'assets/icons/share.svg'},
                {label: 'Copy', svg: 'assets/icons/copy.svg'},
                {label: 'Archive', svg: 'assets/icons/archive.svg'},
                {label: 'Delete', svg: 'assets/icons/delete.svg', click: param.delete},
            ];
            
            return arr;
        }
        
        function getSheetValue() {
      
            var changeStatus = [
                {key: 'DUPLICATE', action: '/'},
            ];
            
             var copyToPrototype = [
                {key: 'NEW PROTOTYPE', action: '/'},
                {key: 'PROTOTYPE 1', action: '/'},
                {key: 'PROTOTYPE 2', action: '/'},
            ];
            
             var moveToSection = [
                {key: 'DUPLICATE', action: '/'},
            ];
            
            var arr = [
                {key: 'DUPLICATE', action: '/'},
                {key: 'CHANGE STATUS', value: changeStatus},
                {key: 'COPY TO PROTOTYPE', value: copyToPrototype},
                {key: 'MOVE TO SECTION', value: moveToSection},
            ];
            
            return arr;
        }
        function showBottomSheet() {
             if(!showBottomFlag && !selectedObject.length){
                showBottomFlag = true;
                $mdBottomSheet.hide();
            }
            
            if(showBottomFlag && selectedObject.length){
                showBottomFlag = false;
                $mdBottomSheet.show({
                templateUrl: 'app/components/bottomSheet/bottomSheet.html',
                controller: 'BottomSheetController',
                controllerAs:'bott',
                clickOutsideToClose: false,
                disableParentScroll : false,
                disableBackdrop: true,
                onRemove: function (scope, element, options) {
                
                    if(!selectedObject.length){
                        var scrollmask = document.getElementsByClassName('md-scroll-mask');
                        var backdrop = document.getElementsByTagName('md-backdrop');
                        angular.element(scrollmask).remove();
                        angular.element(backdrop).remove();
                        angular.element(element).remove();
                    }else{
                        $mdUtil.enableScrolling();
                    }
                }});
            }
           
        }
	}
})();