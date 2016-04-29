(function() {
	'use strict';

	angular
		.module('app')
		.controller('DialogModalController', DialogModalController);

	/** @ngInject */
	function DialogModalController($scope, $mdDialog) {
		var vm = this;
		vm.submit = submit;
		
		function submit(ev, value) {
			if(value === 'Yes'){
				$mdDialog.hide(ev);
			}else{
				$mdDialog.cancel(ev);
			}
		}
	}
})();