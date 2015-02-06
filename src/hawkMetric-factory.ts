/// <reference path="../bower_components/dt-angular/angular.d.ts" />

/**
 * @ngdoc service
 * @name hawkularRest.hawkMetric
 * @description
 * # hawkMetric
 * Factory in the hawkularRest.
 */

module hawkularRest {

  export var hawkMetric = angular.module('hawkular.rest',['ngResource']);

  hawkMetric.provider('HawkularRest', function() {
    // time (in ms) the notifications are shown

    this.host = 'localhost';
    this.port = 8080;

    this.setHost = function(host){
      this.host = host;
      return this;
    };

    this.setPort = function(port){
      this.port = port;
      return this;
    };

    this.$get = ['$resource', function($resource) {

      var prefix = 'http://' + this.host + ':' + this.port;
      var factory = {};

      factory['Tenant'] = $resource(prefix + '/rhq-metrics/tenants', {}, {
        create : {
          method: 'POST'
        }
      });

      factory['Metric'] =$resource(prefix + '/rhq-metrics/:tenantId/metrics', {
        tenantId : '@tenantId'
      }, {
        queryNum: {
          method: 'GET',
          params: { type: 'num' }
        },
        queryAvail: {
          method: 'GET',
          params: { type: 'avail' }
        },
        queryLog: {
          method: 'GET',
          params: { type: 'log' }
        },
        createNumeric : {
          method: 'POST',
          url: prefix + '/rhq-metrics/:tenantId/metrics/numeric',
          params : { tenantId : '@tenantId' }
        },
        createMetric : {
          method: 'POST',
          url: prefix + '/rhq-metrics/:tenantId/metrics/availability',
          params : { tenantId : '@tenantId' }
        }
      });

      return factory;
    }];

  });
}
