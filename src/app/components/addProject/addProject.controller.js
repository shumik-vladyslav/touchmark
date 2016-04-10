(function() {
	'use strict';

	angular
		.module('app')
		.controller('AddProjectController', AddProjectController);

	/** @ngInject */
	function AddProjectController($mdDialog, ProjectsService) {
		var vm = this;
		vm.project = {};
		vm.hide = $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;
		vm.selectType = selectType;
		vm.typeValue = 'Select type';
        vm.type = ['Desktop(web)', 
                'Mobile devices', 
                'iPhone', 'iPad', 
                'Android Phone', 
                'Android Tabled',
                'Apple Watch', 
                'Android Watch']; // зачем она здесь?
        
        
        function selectType(params) {
		    vm.typeValue = params;
		    vm.project.type = params;
        }
        
		function submit() {
                console.log(vm.project.name,vm.typeValue);
                console.log(vm.typeValue !== 'Select type' || vm.project.name);
            
			if(vm.typeValue !== 'Select type' && vm.project.name ) {
                console.log(23,vm.project);
                vm.project.update = new Date();
                ProjectsService.addProject(vm.project);
				$mdDialog.hide();
			}
            
		}
	}
})();