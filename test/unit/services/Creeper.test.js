/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/10
 * @description
 *
 */

var bootstrap = require('../../bootstrap.test.js');
var should = require('should');
var testUser   = 2254858394;
var testStatusUrl = 'http://weibo.com/2992465674/C2Szfnc7Z';

describe('Creeper', function () {
  describe('#creepStatus', function () {
    it('should return the status obj', function (done) {
      Creeper.creepStatus(testUser, testStatusUrl).then(function (data) {
        done();
      })
    });
  });
});