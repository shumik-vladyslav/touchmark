(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);

  /** @ngInject */
  function ProjectsController(ProjectsService, BottomSheetService, $window) {
    var vm = this;
    vm.showGridBottomSheet = BottomSheetService.showBottomSheet;
    vm.filterConfig = ProjectsService.getFilterConfig();
    vm.types = ProjectsService.getTypes();
    vm.add = {
      title: 'Add Project',
      click: ProjectsService.addProjectModal
    };
    vm.projects = ProjectsService.getProjects();
    vm.filter = {
        archive: true
    };
  }
})();
