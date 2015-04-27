'use strict';

describe('Directive: myAnalyzeReport', function () {

  // load the directive's module
  beforeEach(module('weiEyeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-analyze-report></my-analyze-report>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myAnalyzeReport directive');
  }));
});
