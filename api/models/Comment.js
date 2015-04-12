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
    id            : {type: 'string', primaryKey:true, required: true, unique: true},     // 评论的MID
    mid           : {type: 'string', required: true, unique: true},     // 评论的MID
    idstr         : {type: 'string', required: true, unique: true},     // 字符串型的评论ID
    text          : {type: 'string', required: true},     // 评论的内容
    source        : {type: 'string'},     // 评论的来源
    created_at    : {type: 'date'},       // 评论创建时间
    user          : {model: 'User', required: true},      // 评论作者
    status        : {model: 'Status', required: true},    // 评论的微博
    reply_comment : {model: 'Comment'}    // 评论的来源评论，当本评论属于对另一评论的回复时返回此字段
  }
};

