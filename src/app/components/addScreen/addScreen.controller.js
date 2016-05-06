(function() {
	'use strict';

	angular
		.module('app')
		.controller('AddScreenController', AddScreenController);

	/** @ngInject */
	function AddScreenController($mdDialog, $state, ProjectService) {
		var vm = this;
		vm.screen = {
				id: 6,
				name: 'Uikit',
				fileName: 'p6.jpg',
				update: 1460094322,
				owner: {
					id: 2,
					name: 'user2',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fichristiand/128.jpg'
				},
				img: 'assets/images/project/p6.jpg',
			};
		vm.hide = $mdDialog.hide;
		vm.cancel = $mdDialog.cancel;
		vm.submit = submit;
		vm.selectType = selectType;
		vm.typeValue = 'Select type';
        
        
        function selectType(params) {
			vm.typeValue = params;
			vm.project.type = params;
        }
        
		function submit() {
			
                vm.screen.update = new Date();
                ProjectService.addScreen(+$state.params['project'], vm.screen);
				$mdDialog.hide();
            
		}
	}
})();