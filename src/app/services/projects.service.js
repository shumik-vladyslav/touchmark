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
		var projects = [
            {
				name: 'D-D Play',
				update: 1460094322,
                owner: 'user',
                collaborators: ['user', 'user2'], // надо [{key: value, key2: value2}, ...] будет хранить имя, аватарку
                type: 'iPad',
                img: 'assets/images/projects/p1.jpg',
                screens: 18
			},
			{
				name: 'dDt4',
				update: 1460091112,
                owner: 'user',
                collaborators: ['user', 'user2'],
                type: 'Android Phone',
                img: 'assets/images/projects/p2.jpg',
                screens: 7
			},
            {
				name: 'Aaafst2',
				update: 1460094442,
                owner: 'user',
                collaborators: ['user', 'user2', 'user3'],
                type: 'iPad',
                img: 'assets/images/projects/p3.jpg',
                screens: 42
			},
            {
				name: 'St3',
				update: 1460094022,
                owner: 'user2',
                collaborators: ['user', 'user2', 'user3', 'user4'],
                type: 'Android Watch',
                img: 'assets/images/projects/p4.jpg',
                screens: 11
			},
            {
				name: 'Aaf',
				update: 1460092532,
                owner: 'user',
                collaborators: ['user', 'user2', 'user3', 'user4', 'user5'],
                type: 'Android Watch',
                img: 'assets/images/projects/p5.jpg',
                screens: 5
			},
            {
				name: 'aa',
				update: 1460094002,
                owner: 'user2',
                type: 'Android Watch',
                collaborators: ['user2', 'user3', 'user4', 'user5', 'user6'],
                img: 'assets/images/projects/p6.jpg',
                screens: 26
			}
		];
		var service = {
			getTypes: getTypes,
			getProjects: getProjects,
            getUniqueСollaborators: getUniqueСollaborators,
            addProject: addProject,
            addProjectModal: addProjectModal
		};

		return service;

		function getTypes() {
			return types;
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
                // self.refreshData(); // не надо его передавать в контроллер, все операции с этими данными надо делать в этом сервисе
			}, function() {

			});
		}
	}
})();