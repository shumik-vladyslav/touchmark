(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);

  /** @ngInject */
  function ProjectsController(ProjectsService) {
     this.projects = ProjectsService.getProjects();
  }
})();
