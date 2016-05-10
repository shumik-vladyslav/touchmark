(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScreensController', ScreensController);

  /** @ngInject */
  function ScreensController(ScreensService, BottomSheetService, $window, $mdDialog, $state, toastr) {
    var vm = this;
    vm.showGridBottomSheet = BottomSheetService.showBottomSheet;
    vm.filterConfig = ScreensService.getFilterConfig();
    vm.add = {
      title: 'Add Screen',
      click: ScreensService.addScreenModal
    };
    vm.projectId = +$state.params['screens'];
    vm.project = ScreensService.getProject(vm.projectId);
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
            vm.filters[menu.column] = item.key;
          }
        break;
      }
    };

    vm.archive = function(id, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to archive?')
        .textContent('Your projects will be archived')
        .ariaLabel('Archive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        ScreensService.setScreenValue(vm.projectId, id, 'archived', true);
        toastr.success('Successfully', 'Archived', {progressBar: false});
      });
    };

    vm.unArchive = function(id, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to unarchive?')
        .textContent('Your projects will be unarchived')
        .ariaLabel('Unarchive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        ScreensService.setScreenValue(vm.projectId, id, 'archived', false);
        toastr.success('Successfully', 'Unarchived', {progressBar: false});
      });
    };

    vm.copy= function(id) {
      ScreensService.copyScreen(vm.projectId, id);
    };
    
    vm.deleted= function(id) {
      ScreensService.deletedScreen(vm.projectId, id);
    };
  }
})();
