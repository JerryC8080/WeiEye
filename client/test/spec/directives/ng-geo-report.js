'use strict';

describe('Directive: ngGeoReport', function () {

  // load the directive's module
  beforeEach(module('angularDemo2App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-geo-report></ng-geo-report>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngGeoReport directive');
  }));
});
