'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.CONFIG
 * @description
 * # CONFIG
 * Constant in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .constant('CONFIG', {
    apiUrl: 'http://www.weieye.com:1337/api',
    reportTypes : [
      {name: 'user_gender', text: '性别分析', value: false},
      {name: 'user_source', text: '来源分析', value: false},
      {name: 'timeline', text: '时间曲线分析', value: false},
      {name: 'user_geo', text: '地区分析', value: false},
      {name: 'user_verify', text: '认证分析', value: false}
    ]
  });
