'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('ApplicationCtrl', function ($scope, User, $log) {
    $scope.user = User.getUser();
  });
