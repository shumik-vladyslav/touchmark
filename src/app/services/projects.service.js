(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProjectsService', ProjectsService);

	/** @ngInject */
	function ProjectsService($mdDialog, $document, $window, $filter, $http) {
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
			{
				type: 'filter',
				items: [
					{
						key: false,
						value: 'Active'
					},
					{
						key: true,
						value: 'Archive'
					}
				],
				selected: {
					key: false,
					value: 'Active'
				},
				column: 'archived'
			},
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
				items: getUniqueСollaborators(),
				selected: {
					key: 'all',
					value: 'All collaborators'
				},
				column: 'collaborators.key'
			}
		];
		var service = {
			getTypes: getTypes,
			getStatus: getStatus,
			getProjects: getProjects,
			addProject: addProject,
			addProjectModal: addProjectModal,
			getFilterConfig: getFilterConfig,
            getUniqueСollaborators: getUniqueСollaborators,
			updateValue: updateValue,
			deletedProject: deletedProject
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
		function getUniqueСollaborators() {
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
			projects.forEach(function(item, i, arr){
				if(item.id === id){
					item[key] = value;
					
				}
			});
		}
		
		function deletedProject(id){
			projects.forEach(function(item, i, arr){
				if(item.id === id){
					arr.splice(i, 1);
				}
			});
		}
        
        function addProjectModal(ev) {
			$mdDialog.show({
				controller: 'AddProjectController',
				controllerAs:'addProj',
				templateUrl: 'app/components/addProject/addProject.modal.html',
				parent: angular.element($document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function() {
				// self.refreshData(); // не надо его передавать в контроллер, все операции с этими данными надо 
				// делать в этом сервисе
			}, function() {

			});
		}
	}
})();