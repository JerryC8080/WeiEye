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

    User.find(id).then(function (data) {
      $scope.user = data;
    });
  });