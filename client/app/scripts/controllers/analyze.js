'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:AnalyzeCtrl
 * @description
 * # AnalyzeCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('AnalyzeCtrl', function (notify, User, $rootScope, $log, $scope, $location, Report, Comment, Status) {

    var perStepPercent = 0;
    var user = User.getUser();

    if (!user.id){
      notify({ message: '您未登录,无法使用分析功能', classes: ['alert-waring']});
    }

    $scope.processBar = {
      percent: 0
    };

    $rootScope.return_to = '#/analyze';

    $scope.formData = {};

    $scope.analyzeLogs = [];

    // do analyze
    $scope.doAnalyze = function () {

      if (!user.id){
        notify({ message: '您未登录,无法使用分析功能', classes: ['alert-danger']});
        return ;
      }

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
        notify({ message: '分析失败，链接超时', classes: ['alert-danger']});
        $log.error(response.msg);
      }
    });
    io.socket.on('analyze_completed', function (response) {
      if (response && response.status === 200){
        $scope.analyzeLogs.push('分析完毕');
        $scope.processBar.percent = 100;
        $scope.$apply();
        $scope.$emit('AnalyzeCompleted', response.data);
      }else{
        notify({ message: '分析失败，请检查网络链接', classes: ['alert-danger']});

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
      }, 1000)
    })
  });
