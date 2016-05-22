(function() {
  'use strict';

  angular
    .module('app')
    .factory('CommonService', CommonService);

  /** @ngInject */
  function CommonService($mdDialog, $document){

    var service = {
      formDialog: formDialog
    };

    return service;

    function formDialog(ev, scope){
      return $mdDialog.show({
        controller: 'FormDialogController',
        controllerAs:'dialog',
        templateUrl: 'app/common/formDialog/formDialog.modal.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false,
        bindToController: true,
        locals: scope
      });
    }

  }

})();
