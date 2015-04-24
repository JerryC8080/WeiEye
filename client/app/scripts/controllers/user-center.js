'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:UserCenterCtrl
 * @description
 * # UserCenterCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('UserCenterCtrl', function ($scope, User, Status) {
    $scope.user = User.getUser();

    Status.getMyAnalyzeStatus().then(function (status) {
      $scope.analyzeStatus = status;
    });
    Status.getTimeline().then(function (status) {
      $scope.timelineStatus = status
    });
  });
