'use strict';

describe('Service: loginDialog', function () {

  // load the service's module
  beforeEach(module('weiEyeApp'));

  // instantiate service
  var loginDialog;
  beforeEach(inject(function (_loginDialog_) {
    loginDialog = _loginDialog_;
  }));

  it('should do something', function () {
    expect(!!loginDialog).toBe(true);
  });

});
