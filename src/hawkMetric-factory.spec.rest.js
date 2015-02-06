angular.module('httpReal', ['ng'])
  .config(['$provide', function($provide) {
    $provide.decorator('$httpBackend', function() {
      return angular.injector(['ng']).get('$httpBackend');
    });
  }])
  .service('httpReal', ['$rootScope', function($rootScope) {
    this.submit = function() {
      $rootScope.$digest();
    };
  }]);

var TIMEOUT = 30000;

describe('Factory: HawkMetric live REST', function() {

  var HawkularRest;
  var res;
  var httpReal;

  beforeEach(module('hawkular.rest', 'httpReal'));

  beforeEach(inject(function(_HawkularRest_, _$resource_, _httpReal_) {
    HawkularRest = _HawkularRest_;
    res = _$resource_
    httpReal = _httpReal_;
  }));

  describe("creating a tenant", function() {
    var result;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT;

    beforeEach(function(done) {

      var tenant = {
        id: 'com.acme.sk',
        retentions: {
          numeric: 300,
          availability: 80
        }
      };

      result = HawkularRest.Tenant.create(tenant);
      httpReal.submit();

      result.$promise.then(function(){
      }, function(error){
        fail(error.data.errorMsg);
      }).finally(function(){
        done();
      });
    });

    it('should resolve', function() {
      expect(result.$resolved).toEqual(true);
    });
  });

  describe("getting a tenant", function() {
    var result;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT;

    beforeEach(function(done) {

      result = HawkularRest.Tenant.query();
      httpReal.submit();

      result.$promise.then(function(){
      }, function(error){
        fail(error.data.errorMsg);
      }).finally(function(){
        done();
      });
    });

    it('should resolve', function() {
      expect(result.$resolved).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('com.acme.sk');
    });
  });

  describe("creating another tenant", function() {
    var result;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT;

    beforeEach(function(done) {

      var tenant = {
        id: 'com.acme.sk2',
        retentions: {
          numeric: 300,
          availability: 80
        }
      };

      result = HawkularRest.Tenant.create(tenant);
      httpReal.submit();

      result.$promise.then(function(){
      }, function(error){
        fail(error.data.errorMsg);
      }).finally(function(){
        done();
      });
    });

    it('should resolve', function() {
      expect(result.$resolved).toEqual(true);
    });
  });

  describe("getting a tenant", function() {
    var result;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT;

    beforeEach(function(done) {

      result = HawkularRest.Tenant.query();
      httpReal.submit();

      result.$promise.then(function(){
      }, function(error){
        fail(error.data.errorMsg);
      }).finally(function(){
        done();
      });
    });

    it('should get two tenants', function() {
      expect(result.$resolved).toBe(true);
      expect(result.length).toBe(2);
    });
  });
});
