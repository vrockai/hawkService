'use strict';

module hawkularRest {

  interface INavbarScope extends ng.IScope {
    date: Date
  }

  export class NavbarCtrl {
    /* @ngInject */
    constructor ($scope: INavbarScope) {
      $scope.date = new Date();
    }
  }

}
