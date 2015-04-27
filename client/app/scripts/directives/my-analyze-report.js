'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:myAnalyzeReport
 * @description
 * # myAnalyzeReport
 */
angular.module('weiEyeApp')
  .directive('myAnalyzeReport', function ($log) {
    return {
      template: '<div>{{myReport}}</div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        $log.info(scope.myReport);
      }
    };
  });
