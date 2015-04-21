'use strict';

/**
 * @ngdoc function
 * @name angularDemo2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the WeiEyeApp
 */
angular.module('weiEyeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
