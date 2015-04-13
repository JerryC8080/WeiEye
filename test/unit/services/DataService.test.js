/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/3/15
 * @description
 *
 */

var bootstrap = require('../../bootstrap.test.js');
var should = require('should');
var USER   = 2254858394;

describe('DataService', function () {
  describe.skip('#downloadStatusInfo', function () {
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

  describe('#downloadCommentsOfStatus', function () {
    it('should return the comments of status which given by id', function (done) {
      var statusID = 3521985244406108;
      DataService.downloadCommentsOfStatus(USER, statusID).then(function (comments) {
        sails.log.info('The comments of status \'' + statusID + '\' has been saved:');
        sails.log.info(comments);
        done();
      }).catch(function (err) {
        sails.log.info(err);
        done(err);
      })
    });
  });
});

