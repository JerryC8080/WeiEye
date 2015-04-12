/**
* ReportType.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema      : true,
  tableName   : 'report_types',
  identity    : 'ReportType',

  attributes: {
    name        : {type: 'string', unique: true, required: true},   // 报告名称
    description : {type: 'string'}    // 报告描述
  }
};

