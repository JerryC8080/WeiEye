'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:loginDialog
 * @description
 * # loginDialog
 */
angular.module('weiEyeApp')
  .directive('loginDialog', function () {
    return {
      restrict: 'A',
      template: '<div ng-if="visible" ng-include="\'login-form.html\'">',
      link: function (scope) {
        var showDialog = function () {
          scope.visible = true;
        };

        scope.visible = false;
      }
    };
  });
