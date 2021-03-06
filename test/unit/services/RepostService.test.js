/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/4/15
 * @description
 *
 */

var bootstrap = require('../../bootstrap.test.js');
var should = require('should');
var STATUS = 3521985244406108;

describe('ReportService', function () {
  describe('#generateGenderReport', function () {
    it('it should be return gender report of given status', function (done) {
      ReportService.generateGenderReport(STATUS, 1, 2254858394).then(function (report) {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe('#generateSourceReport', function () {
    it('it should be return source report of given status', function (done) {
      ReportService.generateSourceReport(STATUS, 1, 2254858394).then(function (report) {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe('#generateVerifyReport', function () {
    it('it should be return source report of given status', function (done) {
      ReportService.generateVerifyReport(STATUS, 1, 2254858394).then(function (report) {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe('#generateTimelineReport', function () {
    it('it should be return timeline report of given status', function (done) {
      ReportService.generateTimelineReport(STATUS, 1, 2254858394).then(function (report) {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe.only('#generateGeoReport', function () {
    it('it should be return timeline report of given status', function (done) {
      ReportService.generateGeoReport(STATUS, 1, 2254858394).then(function (report) {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });
});

