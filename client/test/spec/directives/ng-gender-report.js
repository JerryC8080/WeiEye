'use strict';

describe('Directive: ngGenderReport', function () {

  // load the directive's module
  beforeEach(module('angularDemo2App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-gender-report></ng-gender-report>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngGenderReport directive');
  }));
});
