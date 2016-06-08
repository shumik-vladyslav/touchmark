(function () {
  'use strict';

  angular
    .module('app')
    .controller('ScreensController', ScreensController);

  /** @ngInject */
  function ScreensController(ScreensService, CommonService, BottomSheetService, $window, $mdDialog, $state, toastr) {
    var vm = this;
    vm.showGridBottomSheet = BottomSheetService.showBottomSheet;
    BottomSheetService.setBottomService(ScreensService);
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

    vm.setCardType = function (type) {
      vm.cardType = type;
    };

    vm.pickFilter = function (el) {

      var collaborators = el.collaborators, isCollaborator = false;
      if (!vm.filters.collaborator) {
        isCollaborator = true;
      } else {
        for (var i in collaborators) {
          if (collaborators[i].key === vm.filters.collaborator) {
            isCollaborator = true;
          }
        }
      }

      var isType = ((vm.filters.type && el.type === vm.filters.type) || !vm.filters.type);

      var archived = (vm.filters.archived === el.archived);

      var result = (isType && isCollaborator && archived);

      return result;
    };

    vm.filterSelect = function (item, menu) {
      menu.selected = item;
      var _ = $window._;

      switch (menu.type) {
        case 'order':
          vm.orders = item.expression;
          break;
        case 'filter':
          if (item.key === 'all') {
            vm.filters = _.omit(vm.filters, menu.column);
          } else {
            if (menu.column === 'collaborator') {
              vm.filters[menu.column] = item.key;
            } else {
              vm.filters[menu.column] = item.key;
            }
          }
          break;
      }
    };

    vm.addScreentModal = function (ev) {
      CommonService.formDialog(
        ev,
        {
          title: 'Add new screen',
          items: [
            {
              type: 'input',
              name: 'name',
              label: 'Project name',
              required: true,
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                }
              ]
            }
          ],
          action: {
            submit: {
              name: 'Add'
            },
            cancel: {
              name: 'Cancel'
            }
          }
        }
      ).then(function (data) {
        var screen = {
          id: 6,
          name: data.name,
          fileName: 'p6.jpg',
          owner: {
            id: 2,
            name: 'user2',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fichristiand/128.jpg'
          },
          img: 'assets/images/project/p6.jpg'
        };
        screen.update = new Date();
        ScreensService.addScreen(+$state.params['screens'], screen);
      });
    };

    vm.archive = function (id, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to archive?')
        .textContent('Your projects will be archived')
        .ariaLabel('Archive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function () {
        ScreensService.setScreenValue(vm.projectId, id, 'archived', true);
        toastr.success('Successfully', 'Archived', { progressBar: false });
      });
    };

    vm.unArchive = function (id, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to unarchive?')
        .textContent('Your projects will be unarchived')
        .ariaLabel('Unarchive dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Archive')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function () {
        ScreensService.setScreenValue(vm.projectId, id, 'archived', false);
        toastr.success('Successfully', 'Unarchived', { progressBar: false });
      });
    };

    vm.copy = function (id, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to copy?')
        .textContent('Your projects will be copied')
        .ariaLabel('Copy dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Copy')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function () {
        ScreensService.copyScreen(vm.projectId, id);
        toastr.success('Successfully', 'Copied', { progressBar: false });
      });
    };

    vm.deleted = function (id, ev) {
      var confirm = $mdDialog.confirm()
        .title('Would you like to deleted?')
        .textContent('Your projects will be deleted')
        .ariaLabel('Delete dialog')
        .targetEvent(ev)
        .theme('navAuth')
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function () {
        ScreensService.deletedScreen(vm.projectId, id);
        toastr.success('Successfully', 'Deleted', { progressBar: false });
      });
    };

    vm.view = function (id) {
      $state.go('main.screen', { screen: id });
    };
  }
})();
