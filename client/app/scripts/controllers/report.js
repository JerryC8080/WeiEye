'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('ReportCtrl', function ($rootScope, $log, $scope, Report) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var reports = Report.getReport();
    $log.info('ReportCtrl:');
    $log.info('reports is :', reports);

  });
