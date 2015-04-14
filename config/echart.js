/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/4/12
 * @description
 *
 */

module.exports.echart = {
  templates: {

    // 饼图数据模版
    'pie': {
      title : {
        text: '用户性别分析报告',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient : 'vertical',
        x : 'left',
        data:['A','B','C','D','E']
      },
      series : [
        {
          name:'用户性别',
          type:'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'A'},
            {value:310, name:'B'},
            {value:234, name:'C'},
            {value:135, name:'D'},
            {value:1548, name:'E'}
          ]
        }
      ]
    },

    // 柱形图
    'bar': {
      title: {
        x: 'center',
        text: 'ECharts例子个数统计'
      },
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        borderWidth: 0,
        y: 80,
        y2: 60
      },
      xAxis: [
        {
          type: 'category',
          show: false,
          data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel', 'Test']
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
        }
      ],
      series: [
        {
          name: 'ECharts例子个数统计',
          type: 'bar',
          itemStyle: {
            normal: {
              /*
              color: function(params) {
                // build a color map as your need.
                var colorList = [
                  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                  '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                  '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                ];
                return colorList[params.dataIndex]
              },
              */
              label: {
                show: true,
                position: 'top',
                formatter: '{b}\n{c}'
              }
            }
          },
          data: [12,21,10,4,12,5,6,5,25,23,7,10]
        }
      ]
    }
  }
};