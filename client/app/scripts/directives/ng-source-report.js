'use strict';

/**
 * @ngdoc directive
 * @name weiEyeApp.directive:ngSourceReport
 * @description
 * # ngSourceReport
 */
angular.module('weiEyeApp')
  .directive('ngSourceReport', function ($rootScope, Report) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var report = null;
        if (scope.value && scope.key){
          report = scope.value['user_source'];
        }else{
          report = Report.getReport()['user_source'];
        }

        if (report){
          element.css('height', 400);

          // 基于准备好的dom，初始化echarts图表
          var myChart = echarts.init(element[0]);

          // 添加额外配置
          var option = report.data;
          option.series[0].itemStyle.normal.color = function(params) {
            // build a color map as your need.
            var colorList = [
              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
              '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
              '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
            ];
            return colorList[params.dataIndex]
          };

          // 为echarts对象加载数据
          myChart.setOption(option);
        }
      }
    };
  });
