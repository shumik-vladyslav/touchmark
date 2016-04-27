(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);

  /** @ngInject */
  function ProjectsController(ProjectsService, BottomSheetService, $window, $mdDialog, toastr) {
    var vm = this;
    vm.showGridBottomSheet = BottomSheetService.showBottomSheet;
    vm.filterConfig = ProjectsService.getFilterConfig();
    vm.types = ProjectsService.getTypes();
    vm.add = {
      title: 'Add Project',
      click: ProjectsService.addProjectModal
    };
    vm.projects = ProjectsService.getProjects();
    vm.filters = {};
    vm.orders = '';
    vm.filterSelect = function(item, menu) {
      menu.selected = item;
      var _ = $window._;

      switch(menu.type) {
        case 'order':
          vm.orders = item.expression;
        break;
        case 'filter':
          if(item.key === 'all') {
            vm.filters = _.omit(vm.filters, menu.column);
          } else {
            if(menu.column === 'collaborators.key') {
              vm.filters[menu.column] = item.key;
            } else {
              vm.filters[menu.column] = item.key;
            }
          }
        break;
      }
    };
    vm.archive = function(project, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to archive?')
        .textContent('Your projects will be archived')
        .ariaLabel('Archive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        project.archived = true;
        toastr.success('Successfully', 'Archived', {timeOut: false});
      }, function() {

      });
    };
    vm.unArchive = function(project, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to unarchive?')
        .textContent('Your projects will be unarchived')
        .ariaLabel('Unarchive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        project.archived = false;
        toastr.success('Successfully', 'Unarchived', {timeOut: false});
      }, function() {

      });
    };
  }
})();
