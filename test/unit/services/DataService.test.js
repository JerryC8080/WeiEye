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

describe('DataService', function () {
  describe('#downloadStatusInfo', function () {
    it('should return the status obj', function (done) {
      var ID = 3634396802717902;
      DataService.downloadStatusInfo(1, 3634396802717902).then(function (status) {
        sails.log.info('A status created, id :' + status.id);
        done();
      }).catch(function (err) {
        sails.log.info(err);
        done(err);
      });
    });
  });
});