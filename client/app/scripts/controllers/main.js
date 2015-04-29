'use strict';

/**
 * @ngdoc function
 * @name angularDemo2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the WeiEyeApp
 */
angular.module('weiEyeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
