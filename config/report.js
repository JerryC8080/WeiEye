/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/12
 * @description
 *
 */

module.exports.report = {
  report_types: {
    'user_source': {
      id: 1,
      name: 'user source',
      description: '用户来源分析报告（客户端分析）'
    },
    'user_geo': {
      id: 2,
      name: 'user geo',
      description: '用户地区分析报告'
    },
    'user_gender': {
      id: 3,
      name: 'user gender',
      description: '用户性别分析报告'
    },
    'user_verify': {
      id: 4,
      name: 'user verify',
      description: '用户验证分析报告'
    },
    'timeline': {
      id: 5,
      name: 'timeline',
      description: '创建时间分布分析报告'
    }
  }
};