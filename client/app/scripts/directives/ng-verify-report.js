'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:ngVerifyReport
 * @description
 * # ngVerifyReport
 */
angular.module('weiEyeApp')
  .directive('ngVerifyReport', function ($rootScope, Report) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var report = Report.getReport()['user_verify'];
        if (report){
          element.css('height', 400);

          // 基于准备好的dom，初始化echarts图表
          var myChart = echarts.init(element[0]);

          // 添加额外配置
          var option = report.data;
//          option.tooltip.formatter = function(params) {
//            return params[0].name + '<br/>'
//              + params[0].seriesName + ' : ' + params[0].value + ' (m^3/s)<br/>'
//          };

          // 为echarts对象加载数据
          myChart.setOption(option);
        }
      }
    };
  });
