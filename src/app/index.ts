/// <reference path="../../bower_components/dt-angular/angular.d.ts" />

'use strict';

module hawkularRest {
  angular.module('hawkularRest', ['ngResource'])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
    ;
}
