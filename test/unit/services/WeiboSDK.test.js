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
var USER = 2254858394;

describe('WeiboSDK', function () {
  /**
   * Test for WeiboSDK.queryID
   */
  describe('#queryID', function () {
    it('should return id of MID', function (done) {
      var MID = 'C2Szfnc7Z';
      WeiboSDK.queryID(USER, MID, 1, 1).then(function (resBody) {
        sails.log.info('the ID of MID \'' + MID + '\' is ' + resBody.id);
        sails.log.info(resBody);
        resBody.should.have.property('id');
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  /**
   * Test for WeiboSDK.showStatus
   */
  describe('#showStatus', function () {
    it('should return status info', function (done) {
      var ID = 3806864175528167;
      WeiboSDK.showStatus(USER, ID).then(function (resBody) {
        sails.log.info('the status \' ' + ID + '\' content goes here : ');
        sails.log.info(resBody);
        done();
      }).catch(function (err) {
        sails.log.error(err);
        done(err);
      })
    })
  })
});