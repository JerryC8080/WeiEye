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

describe('WeiboSDK', function () {
  /**
   * Test for WeiboSDK.queryID
   */
  describe('#queryID', function () {
    it('should return id of MID', function (done) {
      var MID = 'C2qZL6E1h';
      WeiboSDK.queryID(1, MID, 1, 1).then(function (resBody) {
        sails.log.info('resBody goes here : ');
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
      var ID = 3634396802717902;
      WeiboSDK.showStatus(1, ID).then(function (resBody) {
        sails.log.info('resBody goes here : ');
        sails.log.info(resBody);
        done();
      }).catch(function (err) {
        sails.log.error(err);
        done(err);
      })
    })
  })
});