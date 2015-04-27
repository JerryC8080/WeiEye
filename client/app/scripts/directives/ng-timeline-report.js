'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:ngTimelineReport
 * @description
 * # ngTimelineReport
 */
angular.module('weiEyeApp')
  .directive('ngTimelineReport', function ($rootScope, Report) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var report = null;
        if (scope.value && scope.key){
          report = scope.value['timeline'];
        }else{
          report = Report.getReport()['timeline'];
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
