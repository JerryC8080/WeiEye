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

    // 圆环图
    'ring_pie': {
      title : {
        text: '用户认证分析报告',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
        {
          name:'访问来源',
          type:'pie',
          radius : ['50%', '70%'],
          itemStyle : {
            normal : {
              label : {
                show : false
              },
              labelLine : {
                show : false
              }
            },
            emphasis : {
              label : {
                show : true,
                position : 'center',
                textStyle : {
                  fontSize : '30',
                  fontWeight : 'bold'
                }
              }
            }
          },
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
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
    },

    // 面积图
    'area': {
      title : {
        text: '雨量流量关系图',
        x: 'center'
      },
      tooltip : {
        trigger: 'axis'
        /*
        formatter: function(params) {
          return params[0].name + '<br/>'
            + params[0].seriesName + ' : ' + params[0].value + ' (m^3/s)<br/>'
        }
        */
      },
      dataZoom : {
        show : true,
        realtime : true,
        start : 0,
        end : 100
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          axisLine: {onZero: false},
          data : [
            '2009/6/12 2:00', '2009/6/12 3:00',
          ]
        }
      ],
      yAxis : [
        {
          name : '流量(m^3/s)',
          type : 'value',
          max : 500
        }
      ],
      series : [
        {
          name:'流量',
          type:'line',
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data:[
            0.97,0.96
          ]
        }
      ]
    },

    // 地图
    'map': {
      title : {
        text: 'iphone销量',
        x:'center'
      },
      tooltip : {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        x:'left',
        data:['iphone3']
      },
      dataRange: {
        min: 0,
        max: 10,
        x: 'left',
        y: 'bottom',
        text:['高','低'],           // 文本，默认为数值文本
        calculable : true
      },
      roamController: {
        show: true,
        x: 'right',
        mapTypeControl: {
          'china': true
        }
      },
      series : [
        {
          name: 'iphone3',
          type: 'map',
          mapType: 'china',
          roam: false,
          itemStyle:{
            normal:{label:{show:true}},
            emphasis:{label:{show:true}}
          },
          data:[
            {name: '北京',value: Math.round(Math.random()*1000)},
            {name: '天津',value: Math.round(Math.random()*1000)},
            {name: '上海',value: Math.round(Math.random()*1000)},
            {name: '重庆',value: Math.round(Math.random()*1000)},
          ]
        }
      ]
    }
  }
};