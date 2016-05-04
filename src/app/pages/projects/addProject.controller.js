(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddProjectController', AddProjectController);

/** @ngInject */
 function AddProjectController($mdDialog, ProjectsService, toastr) {

		var vm = this;

    vm.projectTypes = ProjectsService.getTypes();

    vm.project = {
      name: '',
      type: '',
      id: new Date().getTime(),
      update: 1460094002,
      owner: 'user2',
      collaborators: ProjectsService.rndUsers(),
      img: 'assets/images/projects/p6.jpg',
      screens: 26,
      archived: false
    };

    vm.close = function () {
      $mdDialog.hide();
    };

    vm.submit = function () {
      ProjectsService.addProject(vm.project);
      vm.close();
      toastr.success('Successfully', 'Add new prototype', {progressBar: false});
    }
  }
 })();
