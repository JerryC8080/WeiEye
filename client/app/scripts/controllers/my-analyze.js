'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:MyAnalyzeCtrl
 * @description
 * # MyAnalyzeCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('MyAnalyzeCtrl', function ($scope, $http, myAnalyze, $log) {
    var analyzeData = myAnalyze.getAnalyzeData();
//    $log.info('MyAnalyzeCtrl:', analyzeData);
    if (analyzeData){
      $scope.reports  = analyzeData.reports;
      $scope.comments = analyzeData.comments;
      $scope.status   = analyzeData.status;
    }
  });
