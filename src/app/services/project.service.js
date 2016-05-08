(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProjectService', ProjectService);

	/** @ngInject */
	function ProjectService($mdDialog, $document, $window) {
		
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
			var rnd = Math.floor(Math.random() * 5) + 1;
			for (var i = 0; i < rnd; i++) {
				col.push(screens[i]);
			}
			return col;
		};
		
		var project = [
			{id: 1, name: 'Desmark', screens: rndScreen(), collaborators: rndUsers()},	
			{id: 3, name: 'Desmark ID 3', screens: rndScreen(), collaborators: rndUsers()}	
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
		];
		var service = {
			getStatus: getStatus,
			getProject: getProject,
			addScreen: addScreen,
			addScreenModal: addScreenModal,
			getFilterConfig: getFilterConfig,
			getUniqueСollaborators: getUniqueСollaborators,
			deletedScreen: deletedScreen,
			copyScreen: copyScreen,
			setScreenValue: setScreenValue
		};

		return service;

		function getStatus() {
			return status;
		}

		function getFilterConfig() {
			return filterConfig;
		}

		function getProject(id) {
			for (var key in project) {
				if (project.hasOwnProperty(key)) {
					var element = project[key];
					if(element.id === id){
						return element;
					}
				}
			}
		}
		function getUniqueСollaborators() {
			var collaborators = [
				{
					key: 'all',
					value: 'All collaborators'
				}
			];
			var _ = $window._;
			for (var key in project) {
				if (project.hasOwnProperty(key)) {
					var element = project[key];

					collaborators = _.concat(collaborators, element.collaborators);
				}
			}
			return _.uniqWith(collaborators, _.isEqual);
		}
		function addScreen(id, screen){
			for (var key in project) {
				if (project.hasOwnProperty(key)) {
					var element = project[key];
					if(element.id === id){
						element.screens.push(screen);
					}
				}
			}
		}

		function deletedScreen(id, screenId){
			for (var key in project) {
				if (project.hasOwnProperty(key)) {
					var element = project[key];
					if(element.id === id){
						element.screens.forEach(function(item, i, arr){
							if(item.id === screenId){
								arr.splice(i, 1);
							}
						});
					}
				}
			}
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
			project.forEach(function(item){
				if(item.id === id){
					item.screens.forEach(function(screen){
						if(screen.id === screenId){
							var tmpProject = {
							id: screen.id + 11,
							name: screen.name + '(Copy)',
							fileName: screen.fileName + '(Copy)',
							update: new Date(),
							owner: screen.owner,
							img: screen.img,
						};
						item.screens.push(tmpProject);
						}
					});
				}
			});
		}
		
		function setScreenValue(id, screenId, key, vlaue){
			project.forEach(function(item){
				if(item.id === id){
					item.screens.forEach(function(screen){
						if(screen.id === screenId){
							screen[key] = vlaue;
						}
					});
				}
			});
		}	
	}
})();
