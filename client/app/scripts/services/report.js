'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.report
 * @description
 * # report
 * Factory in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .factory('Report', function () {
    var _report = {};

    return {
      getReport: function () {
        return _report;
      },
      resetReport: function (report) {
        _report = report;
      }
    };
  });
