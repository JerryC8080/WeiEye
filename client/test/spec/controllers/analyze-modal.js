'use strict';

describe('Controller: AnalyzeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('weiEyeApp'));

  var AnalyzeModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnalyzeModalCtrl = $controller('AnalyzeModalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
