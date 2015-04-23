'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.Comment
 * @description
 * # Comment
 * Factory in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .factory('Comment', function () {
    var _comment = {};

    return {
      getComment: function () {
        return _comment;
      },
      resetComment: function (comment) {
        _comment = comment;
      }
    };
  });
