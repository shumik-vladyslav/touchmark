(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);

  /** @ngInject */
  function ProjectsController(ProjectsService, CommonService, BottomSheetService, $window, $mdDialog, $state, toastr) {
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

    vm.pickFilter = function(el){

      var collaborators = el.collaborators, isCollaborator = false;
      if(!vm.filters.collaborator) {
        isCollaborator = true;
      } else {
        for(var i in collaborators) {
          if(collaborators[i].key === vm.filters.collaborator){
            isCollaborator = true;
          }
        }
      }

      var isType = ( ( vm.filters.type && el.type === vm.filters.type ) || !vm.filters.type );

      var result = ( isType && isCollaborator );

      return result;
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
            if(menu.column === 'collaborator') {
              vm.filters[menu.column] = item.key;
            } else {
              vm.filters[menu.column] = item.key;
            }
          }
        break;
      }
    };


    vm.addProjectModal = function(ev){
      CommonService.formDialog(
        ev,
        {
          title: 'Add new project',
          items: [
            {
              type: 'text',
              name: 'name',
              label: 'Project name',
              required: true,
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                }
              ]
            }, {
              type: 'select',
              name: 'type',
              label: 'Project type',
              required: true,
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                }
              ],
              options: ProjectsService.getTypes()
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
      ).then(function(data){
        ProjectsService.addProject({
          id: new Date().getTime(),
          name: data.name,
          update: new Date().getTime(),
          owner: 'user',
          collaborators: ProjectsService.rndUsers(),
          type: data.type,
          img: 'assets/images/projects/p'+Math.floor(Math.random() * 5 + 1)+'.jpg',
          screens: Math.floor(Math.random() * 29 + 1),
          archived: false
        });
      });
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
