'use strict';

/**
 * @ngdoc service
 * @name adminApp.Comment
 * @description
 * # Comment
 * Factory in the adminApp.
 */
angular.module('adminApp')
  .factory('Comment', function (DS) {
    return DS.defineResource ({
      name: 'comment'
    });
  });
