'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:dateFormat
 * @description
 * # dateFormat
 */
angular.module('weiEyeApp')
  .directive('dateFormat', function ($log) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var time = new Date(parseInt(scope.key));
        element.text(time.toLocaleDateString() + ' ' + time.toLocaleTimeString());
      }
    };
  });
