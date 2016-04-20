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
		
		var status = {
			onHold: 'ON HOLD',
			inProgress: 'IN PROGRESS',
			needsRewiev: 'NEEDS REWIEV',
			approved: 'APPROVED'
		};
		
		var projects = [
            {
				id: '1',
				name: 'D-D Play',
				update: 1460094322,
                owner: 'user',
                collaborators: ['user', 'user2'], // надо [{key: value, key2: value2}, ...] будет хранить имя, аватарку
                type: 'iPad',
                status: status.approved,
                img: 'assets/images/projects/p1.jpg',
                screens: 18
			},
			{
				id: '2',
				name: 'dDt4',
				update: 1460091112,
                owner: 'user',
                collaborators: ['user', 'user2'],
                type: 'Android Phone',
                status: status.approved,
                img: 'assets/images/projects/p2.jpg',
                screens: 7
			},
            {
				id: '3',
				name: 'Aaafst2',
				update: 1460094442,
                owner: 'user',
                collaborators: ['user', 'user2', 'user3'],
                type: 'iPad',
                status: status.approved,
                img: 'assets/images/projects/p3.jpg',
                screens: 42
			},
            {
				id: '11',
				name: 'St3',
				update: 1460094022,
                owner: 'user2',
                collaborators: ['user', 'user2', 'user3', 'user4'],
                type: 'Android Watch',
                status: status.onHold,
                img: 'assets/images/projects/p4.jpg',
                screens: 11
			},
            {
				id: '12',
				name: 'Aaf',
				update: 1460092532,
                owner: 'user',
                collaborators: ['user', 'user2', 'user3', 'user4', 'user5'],
                type: 'Android Watch',
                status: status.needsRewiev,
                img: 'assets/images/projects/p5.jpg',
                screens: 5
			},
            {
				id: '13',
				name: 'aa',
				update: 1460094002,
                owner: 'user2',
                type: 'Android Watch',
                status: status.inProgress,
                collaborators: ['user2', 'user3', 'user4', 'user5', 'user6'],
                img: 'assets/images/projects/p6.jpg',
                screens: 26
			}
		];
		var service = {
			getTypes: getTypes,
			getStatus: getStatus,
			getProjects: getProjects,
            getUniqueСollaborators: getUniqueСollaborators,
            addProject: addProject,
            addProjectModal: addProjectModal,
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

		function getProjects() {
			return projects;
		}

		function updateValue(id, key, value){
			projects.forEach(function(item, i, arr){
				if(item.id === id){
					item[key] = value;
					
				}
			});
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
                // self.refreshData(); // не надо его передавать в контроллер, все операции с этими данными надо делать в этом сервисе
			}, function() {

			});
		}
	}
})();