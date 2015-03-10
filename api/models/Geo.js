/**
* Geo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema      : true,
  tableName   : 'geoes',
  identity    : 'Geo',

  attributes: {
    longitude     : {type: 'string'},    // 经度坐标
    latitude      : {type: 'string'},    // 维度坐标
    city          : {type: 'string'},    // 所在城市的城市代码
    province      : {type: 'string'},    // 所在省份的省份代码
    city_name     : {type: 'string'},    // 所在城市的城市名称
    province_name : {type: 'string'},    // 所在省份的省份名称
    address       : {type: 'string'},    // 所在的实际地址
    pinyin        : {type: 'string'},    // 地址的汉语拼音
    more          : {type: 'string'}     // 更多信息
  }
};

