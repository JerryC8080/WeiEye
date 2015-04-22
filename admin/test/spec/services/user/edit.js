'use strict';

describe('Service: user/edit', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var user/edit;
  beforeEach(inject(function (_user/edit_) {
    user/edit = _user/edit_;
  }));

  it('should do something', function () {
    expect(!!user/edit).toBe(true);
  });

});
