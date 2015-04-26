/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var typeText        = {'评论': 1, '转发': 2},
    reportTypes     = sails.config.report.report_types,
    reportTypesKeys = _.keys(reportTypes),
    Promise         = require("bluebird");

module.exports = {
	analyze: analyze
};

/**
 * Analyze Report
 * @param req
 * @param res
 */
function analyze(req, res) {
  sails.log.info('AnalyzeController.analyze:');
  var isSocket  = req.isSocket,
      socketID  = null,
      statusID  = req.body.statusID,
      user      = req.session.passport && req.session.passport.user,
      statusUrl = req.body.statusUrl,
      reportsType = null,
      type      = '评论';

  // Get socket id if it's socket request
  if (isSocket){
    socketID = sails.sockets.id(req.socket)
  }

  // Check login
  if (!user ){
    sails.log.error('需要登录');
    if (isSocket){
      return SocketService.emitEvent("analyze_msg", {status: 400, msg: '需要登录'}, socketID);
    }
    return res.badRequest('需要登录');
  }

  // Check intergrity of params
  if ((!statusUrl && !statusID) || !type){
    sails.log.error('参数不全');
    if (isSocket){
      return SocketService.emitEvent("analyze_msg", {status: 400, msg: '参数不全'}, socketID);
    }
    return res.badRequest('参数不全');
  }

  // exchange type into number
  type = typeText[type];

  // init reportsType
  reportsType = _.map(reportTypesKeys, function (key) {
    if (req.body[key]){
      return key;
    }
    return null;
  });

  new Promise(function (resolve, reject) {
    if (statusID){
      return resolve(statusID);
    }

    // Translate MID to ID
    var MID = statusUrl.split('?')[0].split('/')[4];
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析链接...'}, socketID);
    WeiboSDK.queryID(user, MID, type, 1).then(function (resBody) {
      statusID = resBody.id;
      if (!statusID){
        reject(new Error('分析链接失败'));
      }
      sails.log.info('分析链接完毕, statusID : ', statusID);
      SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析链接完毕'}, socketID);
      resolve(statusID);
    }).catch(reject);
  }).then(function (statusID) {

    // analyze target status and then return analyze result
    return AnalyzeService.analyze(statusID, user, type, reportsType, socketID)
  }).then(function (results) {

    // Return report
    SocketService.emitEvent("analyze_completed", {
      status: 200,
      msg: '分析报告完毕',
      data: results
    }, socketID);
    sails.log.info('分析报告完毕');
  }).catch(function (err) {
    sails.log.error(err);
    SocketService.emitEvent("analyze_msg", {status: 500, msg: err.message || '未知错误'}, socketID);
  });
}


