(function() {
	'use strict';

	angular
		.module('app')
		.controller('FormDialogController', FormDialogController);



	/** @ngInject */
	function FormDialogController($mdDialog) {
		var vm = this;
		vm.submit = function (ev) {

		};

    vm.cancel = function(ev){
      $mdDialog.cancel(ev);
    };

    vm.getMessagesStr = function(itemName){ 
      return "form." + itemName + ".$error";
    };

    vm.getMessageStr = function(errorName){
      return errorName;
    };

	}
})();
