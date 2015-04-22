'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:ngNav
 * @description
 * # ngNav
 */
angular.module('weiEyeApp')
  .directive('ngNav', function () {
    return {
      restrict: 'EA',
      replace: false,
      link: function postLink(scope, element, attrs) {
        element.find('li').click(function () {
          element.find('li').removeClass('active');
          $(this).addClass('active');
        });
        return element;
      }
    };
  });
