'use strict';

describe('Controller: UserCenterCtrl', function () {

  // load the controller's module
  beforeEach(module('weiEyeApp'));

  var UserCenterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCenterCtrl = $controller('UserCenterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
