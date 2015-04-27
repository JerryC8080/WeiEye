'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:AnalyzeModalCtrl
 * @description
 * # AnalyzeModalCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('AnalyzeModalCtrl', function (notify, statusID, $scope, $modalInstance, CONFIG, User, $rootScope, $log, $location, Report, Comment, Status) {

    $scope.reportTypes = CONFIG.reportTypes;

    $scope.ok = function () {
      $modalInstance.close($scope.reportTypes);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


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
        statusID    : statusID,
        type        : '评论'
      };

      angular.forEach($scope.reportTypes, function (type) {
        $scope.formData[type.name] = type.value;
      });

      $log.info($scope.formData);

      // caculate perStepPercent
      var totalReportAnalyze = 0;
      angular.forEach($scope.formData, function (value, key) {
        if (value === true){
          totalReportAnalyze++;
        }
      });
      perStepPercent = Math.floor(100 / (6 + totalReportAnalyze * 2));

      // get socket request
      io.socket.post('/analyze', $scope.formData);
    };

    // register socket on event
    io.socket.on('analyze_msg', function (response) {
      if (response && response.status === 200){
        $scope.analyzeLogs.push(response.msg);
        $scope.processBar.percent += perStepPercent;
        $scope.$apply();
        $log.info(response.msg);
      }else{
        notify({ message: '分析失败,' + response.msg , classes: ['alert-danger']});
        $scope.cancel();
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
        $log.info(data);
        if (data.reports){
          Report.resetReport(data.reports);
        }
        if (data.comments){
          Comment.resetComment(data.comments);
        }
        if (data.status){
          Status.resetStatus(data.status);
        }

        $location.path('/report');
        $scope.$apply();
        $scope.cancel();
      }, 1000)
    })
  });
