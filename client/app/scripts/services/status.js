'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.Status
 * @description
 * # Status
 * Factory in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .factory('Status', function ($http, CONFIG, $log) {
    var _status = {};

    return {
      getStatus: function () {
        return _status;
      },
      resetStatus: function (status) {
        _status = status;
      },
      getMyAnalyzeStatus: function () {
        return $http
          .get(CONFIG.apiUrl + '/status/getMyAnalyzeStatus')
          .then(function (res) {
            $log.info(res);
            if (res.status === 200){
              return res.data;
            }
          }).catch(function (error) {
            $log.error(error);
          });
      },
      getTimeline: function (access_token) {
        return $http
          .get(CONFIG.apiUrl + '/status/getMyTimeline')
          .then(function (res) {
            $log.info(res);
            if (res.status === 200){
              return res.data;
            }
          }).catch(function (error) {
            $log.error(error);
          });
      }
    };
  });
