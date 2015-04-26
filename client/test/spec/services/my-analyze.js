'use strict';

describe('Service: myAnalyze', function () {

  // load the service's module
  beforeEach(module('weiEyeApp'));

  // instantiate service
  var myAnalyze;
  beforeEach(inject(function (_myAnalyze_) {
    myAnalyze = _myAnalyze_;
  }));

  it('should do something', function () {
    expect(!!myAnalyze).toBe(true);
  });

});
