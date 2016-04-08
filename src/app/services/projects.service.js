(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProjectsService', ProjectsService);

	/** @ngInject */
	function ProjectsService($mdDialog, $document) {
		var currentUser = {};
		var projects = [
            {
				name: 'D-D Play',
				update: new Date("Mon Apr 04 2016 13:45:34"), // используй moment, она уже подключена
                owner: 'user',
                collaborators: ['user', 'user2'], // надо [{key: value, key2: value2}, ...] будет хранить имя, аватарку
                type: 'iPad',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
			{
				name: 'dDt4',
				update: new Date("Mon Apr 11 2016 13:45:34"),
                owner: 'user',
                collaborators: ['user', 'user2'],
                type: 'Android Phone',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Aaafst2',
				update: new Date("Mon Apr 15 2016 13:45:34"),
                owner: 'user',
                collaborators: ['user', 'user2', 'user3'],
                type: 'iPad',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'St3',
				update: new Date("Mon Apr 04 2016 12:45:34"),
                owner: 'user2',
                collaborators: ['user', 'user2', 'user3', 'user4'],
                type: 'Android Watch',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Aaf',
				update: new Date("Mon Apr 04 2016 11:45:34"),
                owner: 'user',
                collaborators: ['user', 'user2', 'user3', 'user4', 'user5'],
                type: 'Android Watch',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'aa',
				update: new Date(),
                owner: 'user2',
                type: 'Android Watch',
                collaborators: ['user2', 'user3', 'user4', 'user5', 'user6'],
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
		];
		var service = {
			getProjects: getProjects,
            getUniqueСollaborators: getUniqueСollaborators,
            addProject: addProject,
            addProjectModal: addProjectModal
			
		};

		return service;

		function getProjects() {
			
			return projects;
		}

        function getUniqueСollaborators() {
            var collaborators = [];
            
            var _ = window._;
            
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
        
        function addProjectModal(ev, self) {
            
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
                self.refreshData(); // не надо его передавать в контроллер, все операции с этими данными надо делать в этом сервисе
			}, function() {

			});
		}
	}
})();