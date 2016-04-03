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
				update: new Date(),
                owner: "user",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test2',
				update: new Date(),
                owner: "user",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test3',
				update: new Date(),
                owner: "user2",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test4',
				update: new Date(),
                owner: "user",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
			{
				name: 'D-D Play',
				update: new Date(),
                owner: "user",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test2',
				update: new Date(),
                owner: "user",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test3',
				update: new Date(),
                owner: "user2",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test4',
				update: new Date(),
                owner: "user",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
            {
				name: 'Test5',
				update: new Date(),
                owner: "user2",
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwQyYNh-ThInQCYVqn-N22BwgcMXC8Az_NuMjFqdLu0ydOoV29aA'
			},
		];
		var service = {
			getProjects: getProjects,
			
		};

		return service;

		function getProjects() {
			
			return projects;
		}

	}
})();