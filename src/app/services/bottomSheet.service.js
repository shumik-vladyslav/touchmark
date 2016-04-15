(function() {
	'use strict';

	angular
		.module('app')
		.factory('BottomSheetService', BottomSheetService);

	/** @ngInject */
	function BottomSheetService($mdBottomSheet, $mdToast) {
        
        var vm = this;
        
		var service = {
            showBottomSheet: showBottomSheet,
            getSheetValue: getSheetValue
		};

		return service;
        
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
            clickOutsideToClose: false});
        }
	}
})();