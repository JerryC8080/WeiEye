'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:AnalyzeCtrl
 * @description
 * # AnalyzeCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('AnalyzeCtrl', function ($scope) {

    $scope.processBar = {
      percent: '0',
      text: '0% complete'
    };

    $scope.analyzeLogs = [];

    $scope.formData = {};

    // register socket on event
    io.socket.on('analyze_msg', function (response) {
      if (response && response.status === 200){
        $scope.analyzeLogs.push(response.msg);
        console.log(response.msg);
      }
    });

    // do analyze
    $scope.doAnalyze = function () {

      // get from data
      $scope.formData = {
        statusUrl   : $scope.statusUrl,
        user_gender : $scope.user_gender,
        user_source : $scope.user_source,
        timeline    : $scope.timeline,
        user_geo    : $scope.user_geo,
        user_verify : $scope.user_verify,
        type        : 1
      };

      // get socket request
      socket.get('/analyze-test', $scope.formData, function (resData) {
        console.log(resData);
        console.log(resData.report);
      });
    }
  });
