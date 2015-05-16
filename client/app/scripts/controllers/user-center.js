'use strict';

/**
 * @ngdoc function
 * @name weiEyeApp.controller:UserCenterCtrl
 * @description
 * # UserCenterCtrl
 * Controller of the weiEyeApp
 */
angular.module('weiEyeApp')
  .controller('UserCenterCtrl', function (notify, $scope, User, Status, $modal, $log, myAnalyze, $location) {
    $scope.user = User.getUser();
    $scope.openAnalyze = function (statusID) {

      var modalInstance = $modal.open({
        templateUrl: 'analyze-modal.html',
        controller: 'AnalyzeModalCtrl',
        size: 'lg',
        resolve: {
          statusID: function () {
            return statusID;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.myAnalyze = function (statusID) {
      myAnalyze.setStatusID(statusID);
      myAnalyze.getMyAnalyze().then(function () {
        $location.path('/my-analyze');
      });
    };

    Status.getMyAnalyzeStatus().then(function (status) {
      $scope.analyzeStatus = status;
    }).catch(function (error) {
      notify({ message: '获取分析微博失败，请检查网络是否正常', classes: ['alert-danger']});
      $log.error(error);
    });

    Status.getTimeline().then(function (status) {
      $scope.timelineStatus = status
    }).catch(function (error) {
      notify({ message: '获取我的微博失败，请检查网络是否正常', classes: ['alert-danger']});
      $log.error(error);
    });

  });
