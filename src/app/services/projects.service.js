(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProjectsService', ProjectsService);

	/** @ngInject */
	function ProjectsService() {
		var currentUser = {};
		var projects = [
            {
				name: 'D-D Play',
				update: new Date("Mon Apr 04 2016 13:45:34"),
                owner: 'user',
                collaborators: ['user', 'user2'],
                type: 'iPad',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
			{
				name: 'Test4',
				update: new Date("Mon Apr 11 2016 13:45:34"),
                owner: 'user',
                collaborators: ['user', 'user2'],
                type: 'Android Phone',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test2',
				update: new Date("Mon Apr 15 2016 13:45:34"),
                owner: 'user',
                collaborators: ['user', 'user2', 'user3'],
                type: 'iPad',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test3',
				update: new Date("Mon Apr 04 2016 12:45:34"),
                owner: 'user2',
                collaborators: ['user', 'user2', 'user3', 'user4'],
                type: 'Android Watch',
                
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Aa',
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
            getUniqueСollaborators: getUniqueСollaborators
			
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
	}
})();