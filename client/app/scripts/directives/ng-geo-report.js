'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:ngGeoReport
 * @description
 * # ngGeoReport
 */
angular.module('weiEyeApp')
  .directive('ngGeoReport', function ($rootScope, Report) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var report = null;
        if (scope.value && scope.key){
          report = scope.value['user_geo'];
        }else{
          report = Report.getReport()['user_geo'];
        }

        if (report){
          element.css('height', 400);

          // 基于准备好的dom，初始化echarts图表
          var myChart = echarts.init(element[0]);

          // 为echarts对象加载数据
          myChart.setOption(report.data);
        }
      }
    };
  });
