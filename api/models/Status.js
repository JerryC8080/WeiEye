/**
 * Status.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema      : true,
  tableName   : 'statues',
  identity    : 'Status',

  attributes: {
    id                : { type: 'string', unique: true, primaryKey: true},
    mid               : {type: 'string', unique: true},   // 微博的MID
    idstr             : {type: 'string', unique: true},   // 字符串型的微博ID
    text              : {type: 'string'},   // 微博信息内容
    source            : {type: 'string'},   // 微博来源
    truncated         : {type: 'boolean'},  // 是否被截断，true：是，false：否
    favorited         : {type: 'boolean'},  // 是否已收藏，true：是，false：否
    thumbnail_pic     : {type: 'string'},   // 缩略图片地址
    bmiddle_pic       : {type: 'string'},   // 中等尺寸图片地址
    original_pic      : {type: 'string'},   // 原始图片地址
    reposts_count     : {type: 'integer', defaultsTo: 0},  // 转发数
    comments_count    : {type: 'integer', defaultsTo: 0},  // 评论数
    attitudes_count   : {type: 'integer', defaultsTo: 0},  // 表态数
    geo               : {model: 'Geo'},     // 地理信息
    user              : {model: 'User'},    // 微博作者
    retweeted_status  : {model: 'Status'}     // 被转发的原微博信息字段，当该微博为转发微博时返回
  }
};

