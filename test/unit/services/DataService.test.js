/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/3/15
 * @description
 *
 */

var bootstrap = require('../../bootstrap.test.js');
var should = require('should');
var USER   = 2254858394;

describe('DataService', function () {
  describe('#downloadStatusInfo', function () {
    it('should return the status obj', function (done) {
      var ID = 3806864175528167;
      DataService.downloadStatusInfo(USER, ID).then(function (status) {
        sails.log.info('A status created or updated, id :' + status.id);
        done();
      }).catch(function (err) {
        sails.log.info(err);
        done(err);
      });
    });
  });
});