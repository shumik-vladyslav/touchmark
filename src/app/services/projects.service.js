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
				id: '1',
				name: 'D-D Play',
				update: 1460094322, // используй moment, она уже подключена
                owner: 'user',
                collaborators: ['user', 'user2'], // надо [{key: value, key2: value2}, ...] будет хранить имя, аватарку
                type: 'iPad',
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
			{
				id: '2',
				name: 'dDt4',
				update: 1460091112,
                owner: 'user',
                collaborators: ['user', 'user2'],
                type: 'Android Phone',
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				id: '3',
				name: 'Aaafst2',
				update: 1460094442,
                owner: 'user',
                collaborators: ['user', 'user2', 'user3'],
                type: 'iPad',
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				id: '11',
				name: 'St3',
				update: 1460094022,
                owner: 'user2',
                collaborators: ['user', 'user2', 'user3', 'user4'],
                type: 'Android Watch',
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				id: '12',
				name: 'Aaf',
				update: 1460092532,
                owner: 'user',
                collaborators: ['user', 'user2', 'user3', 'user4', 'user5'],
                type: 'Android Watch',
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				id: '13',
				name: 'aa',
				update: 1460094002,
                owner: 'user2',
                type: 'Android Watch',
                collaborators: ['user2', 'user3', 'user4', 'user5', 'user6'],
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			}
		];
		var service = {
			getTypes: getTypes,
			getProjects: getProjects,
            getUniqueСollaborators: getUniqueСollaborators,
            addProject: addProject,
            addProjectModal: addProjectModal,
			deletedProject: deletedProject
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
		
		function deletedProject(id){
			projects.forEach(function(item, i, arr){
				if(item.id === id){
					arr.splice(i, 1);
				}
			})
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