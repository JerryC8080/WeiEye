'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.Status
 * @description
 * # Status
 * Factory in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .factory('Status', function () {
    var _status = {};

    return {
      getStatus: function () {
        return _status;
      },
      resetStatus: function (status) {
        _status = status;
      }
    };
  });
