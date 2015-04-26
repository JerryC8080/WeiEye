'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.myAnalyze
 * @description
 * # myAnalyze
 * Factory in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .factory('myAnalyze', function ($http, CONFIG) {
    var _statusID  = null,
        _data      = {};

    // Public API here
    return {
      setStatusID: function (statusID) {
        return _statusID = statusID;
      },
      getMyAnalyze: function () {
        return $http
          .get(CONFIG.apiUrl + '/report/getReportsByStatusID?statusID=' + _statusID)
          .then(function (res) {
            var analyzeData = res.data;
            if (analyzeData){
              _data.status   = analyzeData.status;
              _data.reports  = analyzeData.reports;
              _data.comments = analyzeData.comments;
            }
            return _data;
          });
      },
      getAnalyzeData: function () {
        return _data;
      }
    };
  });
