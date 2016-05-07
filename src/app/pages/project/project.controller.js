(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController(ProjectService, BottomSheetService, $window, $mdDialog, $state, toastr) {
    var vm = this;
    vm.showGridBottomSheet = BottomSheetService.showBottomSheet;
    vm.filterConfig = ProjectService.getFilterConfig();
    vm.add = {
      title: 'Add Screen',
      click: ProjectService.addScreenModal
    };
    vm.projectId = +$state.params['project'];
    vm.project = ProjectService.getProject(vm.projectId);
    console.log(vm.project)
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


    // vm.filterSelect = function(item, menu) {
    //   menu.selected = item;
    //   var _ = $window._;

    //   switch(menu.type) {
    //     case 'order':
    //       vm.orders = item.expression;
    //     break;
    //     case 'filter':
    //       if(item.key === 'all') {
    //         vm.filters = _.omit(vm.filters, menu.column);
    //       } else {
    //         if(menu.column === 'collaborators.key') {
    //           vm.filters[menu.column] = item.key;
    //         } else {
    //           vm.filters[menu.column] = item.key;
    //         }
    //       }
    //     break;
    //   }
    // };

    vm.archive = function(screen, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to archive?')
        .textContent('Your projects will be archived')
        .ariaLabel('Archive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        screen.archived = true;
        toastr.success('Successfully', 'Archived', {progressBar: false});
      });
    };

    vm.unArchive = function(screen, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to unarchive?')
        .textContent('Your projects will be unarchived')
        .ariaLabel('Unarchive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        screen.archived = false;
        toastr.success('Successfully', 'Unarchived', {progressBar: false});
      });
    };

    vm.copy= function(id) {
      ProjectService.copyScreen(vm.projectId, id);
    };
    
    vm.deleted= function(id) {
      ProjectService.deletedScreen(vm.projectId, id);
    };
  }
})();
