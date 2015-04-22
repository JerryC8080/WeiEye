'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('ReportCtrl', function ($rootScope, $log, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.reports = $rootScope.report
  });
