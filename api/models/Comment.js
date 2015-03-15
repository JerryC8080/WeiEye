/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema      : true,
  tableName   : 'comments',
  identity    : 'Comment',

  attributes: {
    mid           : {type: 'string', require: true, unique: true},     // 评论的MID
    idstr         : {type: 'string', require: true, unique: true},     // 字符串型的评论ID
    text          : {type: 'string', require: true},     // 评论的内容
    source        : {type: 'string'},     // 评论的来源
    create_at     : {type: 'date'},       // 评论创建时间
    user          : {model: 'User', require: true},      // 评论作者
    status        : {model: 'Status', require: true},    // 评论的微博
    reply_comment : {model: 'Comment'}    // 评论的来源评论，当本评论属于对另一评论的回复时返回此字段
  }
};

