'use strict';

/**
 * @ngdoc function
 * @name angularDemo2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularDemo2App
 */
angular.module('angularDemo2App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
