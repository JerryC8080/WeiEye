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
    }
  }
};