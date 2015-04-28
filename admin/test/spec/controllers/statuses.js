'use strict';

describe('Controller: StatusesCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var StatusesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatusesCtrl = $controller('StatusesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
