'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:UserCtrl
 * @description
 * # UserUserCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
  .controller('UserCtrl', function ($scope,$routeParams,DS,User,DSHttpAdapter,notify) {

    var id = $routeParams.id;
    var list = $scope.list = {};
    $scope.newUser = {};
    $scope.user = {};
    //初始化表单需要的选择数据;
    list.gender = ['男','女','其他'];
    list.status = [{
      "flag": 1,
      "label": "正常"
    },{
      "flag": 2,
      "label": "冻结"
    },{
      "flag": 3,
      "label": "黑名单"
    }];
    list.email = [{
      "flag": 0,
      "label": "未认证"
    },{
      "flag": 1,
      "label": "已认证"
    }];
    list.tel = [{
      "flag": 0,
      "label": "未认证"
    },{
      "flag": 1,
      "label": "已认证"
    }];
    list.statusSelec = list.status[0];
    list.emailSelec = list.email[0];
    list.telSelec = list.tel[0];

    User.find(id).then(function (data) {
      $scope.user = data;

      list.statusSelec = list.status[data.status-1];
      list.emailSelec = list.email[data.email_status];
      list.telSelec = list.tel[data.tel_status];
      list.genderSelec = data.gender;
      console.log(list);
    });

    $scope.save = function() {
      DSHttpAdapter.PUT(DS.defaults.baseUrl+'user/'+id, $scope.newUser)
        .then(function () {
          notify({ message:'更新成功',classes:'alert-success'});
          $scope.newUser = {};
        }).catch(function (err) {
          notify({ message:'更新失败'+err,classes:'alert-danger'});
        });
    };

    $scope.update = function (colName) {

      switch (colName) {
        case "gender":
          $scope.newUser[colName] = list.genderSelec;
          break;
        case "status":
          $scope.newUser[colName] = list.statusSelec.flag;
          break;
        case "tel_status":
          $scope.newUser[colName] = list.telSelec.flag;
          break;
        case "email_status":
          $scope.newUser[colName] = list.emailSelec.flag;
          break;
        default:
          $scope.newUser[colName] = $scope.user[colName];
      }
      console.log($scope.newUser);
    };

  });