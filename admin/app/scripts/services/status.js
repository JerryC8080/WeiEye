'use strict';

/**
 * @ngdoc service
 * @name adminApp.status
 * @description
 * # status
 * Factory in the adminApp.
 */
angular.module('adminApp')
  .factory('Status', function (DS) {
    return DS.defineResource ({
      name: 'status'
    });
  });
