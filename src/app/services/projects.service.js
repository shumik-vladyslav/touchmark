(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProjectsService', ProjectsService);

	/** @ngInject */
	function ProjectsService(BottomSheetService, $mdDialog, $document, $window) {
		var vm = this;

		vm.selectedObject = BottomSheetService.getSelectedObject();

		var types = [
			{
				key: 'all',
				value: 'All types'
			},
			{
				key: 'desktop',
				value: 'Desktop(web)'
			},
			{
				key: 'mobile',
				value: 'Mobile devices'
			},
			{
				key: 'iPhone',
				value: 'iPhone'
			},
			{
				key: 'iPad',
				value: 'iPad'
			},
			{
				key: 'android',
				value: 'Android Phone'
			},
			{
				key: 'androidTablet',
				value: 'Android Tablet'
			},
			{
				key: 'appleWatch',
				value: 'Apple Watch'
			},
			{
				key: 'androidWatch',
				value: 'Android Watch'
			}
		];
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
			var rnd = Math.floor(Math.random() * 2);
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

		var projects = [
			{
				id: 1,
				name: 'D-D Play',
				update: 1460094322,
				owner: 'user',
				collaborators: rndUsers(),
				type: 'iPad',
				img: 'assets/images/projects/p1.jpg',
				screens: 18,
				archived: false
			},
			{
				id: 2,
				name: 'dDt4',
				update: 1460091112,
				owner: 'user',
				collaborators: rndUsers(),
				type: 'android',
				img: 'assets/images/projects/p2.jpg',
				screens: 7,
				archived: false
			},
			{
				id: 3,
				name: 'Aaafst2',
				update: 1460094442,
				owner: 'user',
				collaborators: rndUsers(),
				type: 'iPad',
				img: 'assets/images/projects/p3.jpg',
				screens: 42,
				archived: false
			},
			{
				id: 4,
				name: 'St3',
				update: 1460094022,
				owner: 'user2',
				collaborators: rndUsers(),
				type: 'androidWatch',
				img: 'assets/images/projects/p4.jpg',
				screens: 11,
				archived: false
			},
			{
				id: 5,
				name: 'Aaf',
				update: 1460092532,
				owner: 'user',
				collaborators: rndUsers(),
				type: 'androidWatch',
				img: 'assets/images/projects/p5.jpg',
				screens: 5,
				archived: false
			},
			{
				id: 6,
				name: 'aa',
				update: 1460094002,
				owner: 'user2',
				type: 'androidWatch',
				collaborators: rndUsers(),
				img: 'assets/images/projects/p6.jpg',
				screens: 26,
				archived: false
			}
		];
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
			},
			// {
			// 	type: 'filter',
			// 	items: [
			// 		{
			// 			key: false,
			// 			value: 'Active'
			// 		},
			// 		{
			// 			key: true,
			// 			value: 'Archive'
			// 		}
			// 	],
			// 	selected: {
			// 		key: false,
			// 		value: 'Active'
			// 	},
			// 	column: 'archived'
			// },
			{
				type: 'filter',
				items: types,
				selected: {
					key: 'all',
					value: 'All types'
				},
				column: 'type'
			},
			{
				type: 'filter',
				items: getUniqueCollaborators(),
				selected: {
					key: 'all',
					value: 'All collaborators'
				},
				column: 'collaborator'
			}
		];
		var service = {
			getTypes: getTypes,
			getStatus: getStatus,
			getProjects: getProjects,
			addProject: addProject,
			getFilterConfig: getFilterConfig,
      getUniqueCollaborators: getUniqueCollaborators,
			updateValue: updateValue,
			deleted: deletedProjects,
			copy: copyProjects,
			getSheetValue: getSheetValue,
			getSocialButtonValue: getSocialButtonValue,
			update: updateProjects,
			rndUsers: rndUsers
		};

		return service;

		function getTypes() {
			return types;
		}

		function getStatus() {
			return status;
		}

		function getFilterConfig() {
			return filterConfig;
		}

		function getProjects() {
			return projects;
		}

		function getUniqueCollaborators() {
			var collaborators = [
				{
					key: 'all',
					value: 'All collaborators'
				}
			];
			var _ = $window._;
			for (var key in projects) {
				if (projects.hasOwnProperty(key)) {
					var element = projects[key];

					collaborators = _.concat(collaborators, element.collaborators);
				}
			}
			return _.uniqWith(collaborators, _.isEqual);
		}

		function addProject(proj){
			projects.push(proj);
		}

		function updateValue(id, key, value){
			projects.forEach(function(item){
				if(item.id === id){
					item[key] = value;

				}
			});
		}

		function deletedProjects(id){
			projects.forEach(function(item, i, arr){
				if(item.id === id){
					arr.splice(i, 1);
				}
			});
		}

		function copyProjects(id) {
			projects.forEach(function(item){
				if(item.id === id){
					var tmpProject = {
						id: item.id + 11,
						name: item.name + '(Copy)',
						update: item.update,
						owner: item.owner,
						type: item.type,
						collaborators: item.collaborators,
						img: item.img,
						screens: item.screens,
						archived: item.archived
					};
					projects.push(tmpProject);
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
					copyProjects(element.id);
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
					element.archived = true;
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
					deletedProjects(element.id);
				}
				}
				BottomSheetService.deleteCheckedObjects();

				vm.selectedObject = BottomSheetService.getSelectedObject();

				BottomSheetService.showBottomSheet();
			});
		}

		function updateProjects(value){
			for (var key in vm.selectedObject) {
				if (vm.selectedObject.hasOwnProperty(key)) {
					var element = vm.selectedObject[key];
					updateValue(element.id, 'status', value);
				}
			}
			vm.selectedObject = BottomSheetService.getSelectedObject();
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
