/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema      : true,
  tableName   : 'reports',
  identity    : 'Report',

  attributes: {
    target      : {type: 'integer', enum: [1, 2], require: true},   // 目标，1 评论, 2: 转发微博
    data        : {type: 'json', require: true},   // 数据, 存放报告数据
    status      : {model: 'Status', require: true},    // 所属微博
    reportType  : {model: 'ReportType', require: true}   // 报告的类型
  }
};

