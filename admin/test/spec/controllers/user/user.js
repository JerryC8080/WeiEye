'use strict';

describe('Controller: UserUserCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var UserUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserUserCtrl = $controller('UserUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
