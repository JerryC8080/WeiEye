'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:AnalyzeCtrl
 * @description
 * # AnalyzeCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('AnalyzeCtrl', function ($rootScope, $log, $scope, $location, Report) {
    var perStepPercent = 0;

    $scope.processBar = {
      percent: 0
    };

    $scope.formData = {};

    $scope.analyzeLogs = [];

    // do analyze
    $scope.doAnalyze = function () {

      // initialize
      $scope.analyzeLogs = [];
      $scope.processBar.percent = 0;

      // get from data
      $scope.formData = {
        statusUrl   : $scope.statusUrl,
        user_gender : $scope.user_gender,
        user_source : $scope.user_source,
        timeline    : $scope.timeline,
        user_geo    : $scope.user_geo,
        user_verify : $scope.user_verify,
        type        : '评论'
      };

      // caculate perStepPercent
      var totalReportAnalyze = 0;
      angular.forEach($scope.formData, function (value, key) {
        if (value === true){
          totalReportAnalyze++;
        }
      });
      perStepPercent = Math.floor(100 / (6 + totalReportAnalyze * 2));

      // get socket request
      io.socket.get('/analyze-test', $scope.formData);
    };

    // register socket on event
    io.socket.on('analyze_msg', function (response) {
      if (response && response.status === 200){
        $scope.analyzeLogs.push(response.msg);
        $scope.processBar.percent += perStepPercent;
        $scope.$apply();
        $log.info(response.msg);
      }
    });
    io.socket.on('analyze_completed', function (response) {
      if (response && response.status === 200){
        $scope.analyzeLogs.push('分析完毕');
        $scope.processBar.percent = 100;
        $scope.$apply();
        $scope.$emit('AnalyzeCompleted', response.data);
      }
    });

    $scope.$on('AnalyzeCompleted', function (event, data) {
      setTimeout(function () {
        if (data){
          Report.resetReport(data);
          $location.path('/report');
          $scope.$apply();
        }
      }, 1000)
    })
  });
