'use strict';

/**
 * @ngdoc function
 * @name angularDemo2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularDemo2App
 */
angular.module('angularDemo2App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
