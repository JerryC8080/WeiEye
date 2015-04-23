'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('ApplicationCtrl', function ($scope, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };
  });
