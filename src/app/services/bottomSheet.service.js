(function() {
	'use strict';

	angular
		.module('app')
		.factory('BottomSheetService', BottomSheetService);

	/** @ngInject */
	function BottomSheetService($mdBottomSheet, $mdToast) {
        
        var vm = this;
        
        var selectedObject = [];
        
		var service = {
            showBottomSheet: showBottomSheet,
            getSheetValue: getSheetValue,
            pushCheckedObject: pushCheckedObject,
            selectedObject: selectedObject
		};

		return service;
        
        function pushCheckedObject(obj) {
            selectedObject.push(obj);
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
            
            $mdBottomSheet.show({
            templateUrl: 'app/components/bottomSheet/bottomSheet.html',
            controller: 'BottomSheetController',
			controllerAs:'bott',
            clickOutsideToClose: false,
            disableParentScroll : false, 
            onRemove: function (scope, element, options) {
                var scrollmask = document.getElementsByClassName('md-scroll-mask');
                var backdrop = document.getElementsByTagName('md-backdrop');
                angular.element(scrollmask).remove();
                angular.element(backdrop).remove();
                $mdUtil.enableScrolling();
            }});
        }
	}
})();