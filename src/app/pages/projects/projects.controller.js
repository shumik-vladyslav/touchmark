(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);

  /** @ngInject */
  function ProjectsController(ProjectsService, BottomSheetService, $window, $mdDialog, $state, toastr) {
    var vm = this;
    vm.showGridBottomSheet = BottomSheetService.showBottomSheet;
    BottomSheetService.setBottomService(ProjectsService);
    vm.filterConfig = ProjectsService.getFilterConfig();
    vm.types = ProjectsService.getTypes();
    vm.add = {
      title: 'Add Project',
      click: ProjectsService.addProjectModal
    };
    vm.projects = ProjectsService.getProjects();
    vm.filters = {};
    vm.orders = '';
    vm.cardTypes = [
      {
        key: 'module',
        value: 'Module',
        icon: 'assets/icons/view_module.svg'
      },
      {
        key: 'list',
        value: 'List',
        icon: 'assets/icons/view_list.svg'
      }
    ];
    vm.cardType = 'module';

    vm.setCardType = function(type) {
      vm.cardType = type;
    };

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
        toastr.success('Successfully', 'Archived', {progressBar: false});
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
        toastr.success('Successfully', 'Unarchived', {progressBar: false});
      });
    };

    vm.copy= function(id) {
      ProjectsService.copy(id);
    };
    
    vm.view = function(id){
      $state.go('main.screens', {screens: id});
    };
  }
})();
