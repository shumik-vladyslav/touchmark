(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProjectsService', ProjectsService);

	/** @ngInject */
	function ProjectsService($mdDialog, $document, $window) {
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
		var filterConfig = [
			{
				type: 'order',
				items: [
					{
						key: 'recent',
						value: 'Recent'
					},
					{
						key: 'abc',
						value: 'Alphanumeric'
					}
				],
				selected: {
					key: 'recent',
					value: 'Recent'
				}
			},
			{
				type: 'filter',
				items: types,
				selected: {
					key: 'all',
					value: 'All types'
				}
			},
			{
				type: 'filter',
				items: getCollaborators(),
				selected: {
					key: 'all',
					value: 'All types'
				}
			}
		];
		var projects = [
			{
				name: 'D-D Play',
				update: 1460094322,
				owner: 'user',
				collaborators: [
					{
						key: 1,
						value: 'user1'
					},
					{
						key: 2,
						value: 'user2'
					}
				],
				type: 'iPad',
				img: 'assets/images/projects/p1.jpg',
				screens: 18,
				archived: false
			},
			{
				name: 'dDt4',
				update: 1460091112,
				owner: 'user',
				collaborators: [
					{
						key: 4,
						value: 'user4'
					},
					{
						key: 6,
						value: 'user6'
					},
					{
						key: 7,
						value: 'user7'
					}
				],
				type: 'Android Phone',
				img: 'assets/images/projects/p2.jpg',
				screens: 7,
				archived: false
			},
			{
				name: 'Aaafst2',
				update: 1460094442,
				owner: 'user',
				collaborators: [
					{
						key: 3,
						value: 'user3'
					},
					{
						key: 5,
						value: 'user5'
					},
					{
						key: 6,
						value: 'user6'
					}
				],
				type: 'iPad',
				img: 'assets/images/projects/p3.jpg',
				screens: 42,
				archived: false
			},
			{
				name: 'St3',
				update: 1460094022,
				owner: 'user2',
				collaborators: [
					{
						key:2,
						value: 'user2'
					},
					{
						key: 4,
						value: 'user4'
					}
				],
				type: 'Android Watch',
				img: 'assets/images/projects/p4.jpg',
				screens: 11,
				archived: false
			},
			{
				name: 'Aaf',
				update: 1460092532,
				owner: 'user',
				collaborators: [
					{
						key: 2,
						value: 'user2'
					}
				],
				type: 'Android Watch',
				img: 'assets/images/projects/p5.jpg',
				screens: 5,
				archived: false
			},
			{
				name: 'aa',
				update: 1460094002,
				owner: 'user2',
				type: 'Android Watch',
				collaborators: [
					{
						key: 3,
						value: 'user3'
					},
					{
						key: 5,
						value: 'user5'
					}
				],
				img: 'assets/images/projects/p6.jpg',
				screens: 26,
				archived: false
			}
		];
		var service = {
			getTypes: getTypes,
			getProjects: getProjects,
			getUniqueСollaborators: getUniqueСollaborators,
			addProject: addProject,
			addProjectModal: addProjectModal,
			getFilterConfig: getFilterConfig
		};

		return service;

		function getTypes() {
			return types;
		}

		function getFilterConfig() {
			return filterConfig;
		}
		function getProjects() {
			return projects;
		}

		function getUniqueСollaborators() {
			var collaborators = [];

			var _ = $window._;

			for (var key in projects) {
				if (projects.hasOwnProperty(key)) {
					var element = projects[key];

					collaborators = _.concat(collaborators, element.collaborators);
				}
			}
			return _.uniq(collaborators);
		}

		function getCollaborators() {
			var _ = $window._;
			var items = [
				{
					key: 'all',
					value: 'All collaborators'
				}
			];
			for (var key in projects) {
				if (projects.hasOwnProperty(key)) {
					for (var col in projects[key].collaborators) {
						if (projects[key].collaborators.hasOwnProperty(col)) {
							items.push(projects[key].collaborators[col]);
						}
					}
				}
			}
			// console.log(_.uniqBy(projects, 'collaborators'));
			return _.uniqBy(projects, 'collaborators');
		}
		function addProject(proj){
			projects.push(proj);
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