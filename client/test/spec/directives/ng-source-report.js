'use strict';

describe('Directive: ngSourceReport', function () {

  // load the directive's module
  beforeEach(module('angularDemo2App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-source-report></ng-source-report>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngSourceReport directive');
  }));
});
