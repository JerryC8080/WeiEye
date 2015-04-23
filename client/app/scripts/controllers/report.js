'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('ReportCtrl', function ($rootScope, $log, $scope, Report, Comment, Status) {
    $scope.reports  = Report.getReport();
    $scope.comments = Comment.getComment();
    $scope.status   = Status.getStatus();
  });
