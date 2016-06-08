(function() {
	'use strict';

	angular
		.module('app')
		.factory('ScreensService', ScreensService);

	/** @ngInject */
	function ScreensService(BottomSheetService, $mdDialog, $document, $window, $state) {
		var vm = this;

		vm.selectedObject = BottomSheetService.getSelectedObject();

		vm.projectId = +$state.params['screens'];

		var collaborators = [
			{
				key: 1,
				value: 'cindeekeem',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/cindeekeem/128.jpg'
			},
			{
				key: 2,
				value: 'faisal_anwar22',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/faisal_anwar22/128.jpg'
			},
			{
				key: 3,
				value: 'nuraika',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg'
			},
			{
				key: 4,
				value: 'nategoyco',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/nategoyco/128.jpg'
			},
			{
				key: 5,
				value: 'webtanya',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/webtanya/128.jpg'
			},
			{
				key: 6,
				value: 'keremk',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/keremk/128.jpg'
			},
			{
				key: 7,
				value: 'janiashutosh15',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/janiashutosh15/128.jpg'
			},
			{
				key: 8,
				value: 'malgordon',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/malgordon/128.jpg'
			},
			{
				key: 9,
				value: 'fichristiand',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fichristiand/128.jpg'
			},
			{
				key: 10,
				value: 'randomlies',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg'
			}
		];

		var rndUsers = function() {
			var col = [];
			var rnd = Math.floor(Math.random() * 2)+1;
			for (var i = 0; i < rnd; i++) {
				var rnd2 = Math.floor(Math.random() * collaborators.length);
				col.push(collaborators[rnd2]);
			}
			return col;
		};

		var status = {
			onHold: 'ON HOLD',
			inProgress: 'IN PROGRESS',
			needsRewiev: 'NEEDS REWIEV',
			approved: 'APPROVED'
		};

		var screens = [
			{
				id: 1,
				name: 'My project',
				fileName: 'p1.jpg',
				update: 1460094322,
				owner: {
					id: 1,
					name: 'user1',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fichristiand/128.jpg'
				},
				img: 'assets/images/project/p1.jpg',
				archived: false
			},
			{
				id: 2,
				name: 'Activity',
				fileName: 'p2.jpg',
				update: 1460094322,
				owner: {
					id: 3,
					name: 'user3',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/malgordon/128.jpg'
				},
				img: 'assets/images/project/p2.jpg',
				archived: false
			},
			{
				id: 3,
				name: 'Uikit',
				fileName: 'p3.jpg',
				update: 1460094322,
				owner: {
					id: 3,
					name: 'user3',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/malgordon/128.jpg'
				},
				img: 'assets/images/project/p3.jpg',
				archived: false
			},
			{
				id: 4,
				name: 'Home',
				fileName: 'p4.jpg',
				update: 1460094322,
				owner: {
					id: 4,
					name: 'user4',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/janiashutosh15/128.jpg'
				},
				img: 'assets/images/project/p4.jpg',
				archived: false
			},
			{
				id: 5,
				name: 'Activity',
				fileName: 'p5.jpg',
				update: 1460094322,
				owner: {
					id: 3,
					name: 'user3',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/malgordon/128.jpg'
				},
				img: 'assets/images/project/p5.jpg',
				archived: false
			},
			{
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
				archived: false
			}
		];

		var rndScreen = function() {
			var col = [];
			// var rnd = Math.floor(Math.random() * 5) + 1;
			for (var i = 0; i < screens.length; i++) {
				col.push(screens[i]);
			}
			return col;
		};

		var project = {
      id: 1,
      name: 'Desmark',
      screens: screens,
      collaborators: rndUsers()
    };

		var filterConfig = [
			{
				type: 'order',
				items: [
					{
						key: 'recent',
						value: 'Recent',
						expression: '-update'
					},
					{
						key: 'abc',
						value: 'Alphanumeric',
						expression: 'name'
					}
				],
				selected: {
					key: 'recent',
					value: 'Recent',
					expression: '-update'
				}
			}
		];
		var service = {
      project: project,
			getStatus: getStatus,
			// getProject: getProject,
			addScreen: addScreen,
			addScreenModal: addScreenModal,
			getFilterConfig: getFilterConfig,
      getUniqueCollaborators: getUniqueCollaborators,
			deletedScreen: deletedScreen,
			copyScreen: copyScreen,
			setScreenValue: setScreenValue,
			getSheetValue: getSheetValue,
			getSocialButtonValue: getSocialButtonValue
		};

		return service;

		function getStatus() {
			return status;
		}

		function getFilterConfig() {
			return filterConfig;
		}

		// function getProject(id) {

			// for (var key in project) {
			// 	if (project.hasOwnProperty(key)) {
			// 		var element = project[key];
			// 		if(element.id === id){
			// 			return element;
			// 		}
			// 	}
			// }
		// }
		function getUniqueCollaborators() {
			var collaborators = [
				{
					key: 'all',
					value: 'All collaborators'
				}
			];
			var _ = $window._;
      collaborators = _.concat(collaborators, project.collaborators);
			return _.uniqWith(collaborators, _.isEqual);
		}
		function addScreen(id, screen){
			// for (var key in project) {
			// 	if (project.hasOwnProperty(key)) {
			// 		var element = project[key];
			// 		if(element.id === id){
			// 		}
			// 	}
			// }
      project.screens.push(screen);
		}

		function deletedScreen(id, screenId){
			// for (var key in project) {
			// 	if (project.hasOwnProperty(key)) {
			// 		var element = project[key];
			// 		if(element.id === id){
            //
			// 		}
			// 	}
			// }
      project.screens.forEach(function(item, i, arr){
        if(item.id === screenId){
          arr.splice(i, 1);
        }
      });
		}

		function addScreenModal(ev) {
			$mdDialog.show({
				controller: 'AddScreenController',
				controllerAs:'addScreen',
				templateUrl: 'app/components/addScreen/addScreen.modal.html',
				parent: angular.element($document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function() {

			}, function() {

			});
		}

		function copyScreen(id, screenId) {
      project.screens.forEach(function(screen){
        if(screen.id === screenId){
          var tmpProject = {
            id: screen.id + 11,
            name: screen.name + '(Copy)',
            fileName: screen.fileName + '(Copy)',
            update: new Date(),
            owner: screen.owner,
            img: screen.img
          };
          project.screens.push(tmpProject);
        }
      });
		}

		function setScreenValue(id, screenId, key, value){
      project.screens.forEach(function(screen){
        if(screen.id === screenId){
          screen[key] = value;
        }
      });
		}

		function getSocialButtonValue() {
			var arr = [
				{label: 'Share', svg: 'assets/icons/share.svg'},
				{label: 'Copy', svg: 'assets/icons/copy.svg', click: copy},
				{label: 'Archive', svg: 'assets/icons/archive.svg', click: archive},
				{label: 'Delete', svg: 'assets/icons/delete.svg', click: deleted}
			];

			return arr;
		}

		function copy(ev) {
			var confirm = $mdDialog.confirm()
				.title('Would you like to copy?')
				.textContent('Your projects will be copied')
				.ariaLabel('Copy dialog')
				.targetEvent(ev)
				.theme('navAuth')
				.ok('Copy')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function() {
				for (var key in vm.selectedObject) {
				if (vm.selectedObject.hasOwnProperty(key)) {
					var element = vm.selectedObject[key];
					copyScreen(vm.projectId, element.id);
				}
				}
				BottomSheetService.deleteCheckedObjects();

				vm.selectedObject = BottomSheetService.getSelectedObject();

				BottomSheetService.showBottomSheet();
			});
		}

		function deleted(ev) {
			var confirm = $mdDialog.confirm()
				.title('Would you like to delete?')
				.textContent('Your projects will be deleted')
				.ariaLabel('Delete dialog')
				.targetEvent(ev)
				.theme('navAuth')
				.ok('Delete')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function() {
				for (var key in vm.selectedObject) {
				if (vm.selectedObject.hasOwnProperty(key)) {
					var element = vm.selectedObject[key];
					deletedScreen(vm.projectId, element.id);
				}
				}
				BottomSheetService.deleteCheckedObjects();

				vm.selectedObject = BottomSheetService.getSelectedObject();

				BottomSheetService.showBottomSheet();
			});
		}

		function archive(ev) {
			var confirm = $mdDialog.confirm()
				.title('Would you like to archive?')
				.textContent('Your projects will be archived')
				.ariaLabel('Archive dialog')
				.targetEvent(ev)
				.theme('navAuth')
				.ok('Archive')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function() {
				for (var key in vm.selectedObject) {
				if (vm.selectedObject.hasOwnProperty(key)) {
					var element = vm.selectedObject[key];
					setScreenValue(vm.projectId, element.id, 'archived', true);
				}
				}
				BottomSheetService.deleteCheckedObjects();

				vm.selectedObject = BottomSheetService.getSelectedObject();

				BottomSheetService.showBottomSheet();
			});
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

	}
})();
