/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
      statusID  = null,
      user      = req.session.passport && req.session.passport.user,
      statusUrl = req.body.statusUrl,
      type      = req.body.type;


  // Check login
  if (!user ){
    return res.badRequest('需要登录');
  }

  // Check intergrity of params
  if (!statusUrl || !type){
    return res.badRequest('参数不全');
  }
  sails.log.info('分析开始');

  // Get socket id if it's socket request
  if (isSocket){
    socketID = sails.sockets.id(req.socket)
  }

  // Translate MID to ID
  var MID = statusUrl.split('?')[0].split('/')[4];
  emitAnalyzeMsg(socketID, {status: 200, msg: '分析链接...'});
  WeiboSDK.queryID(user, MID, type, 1).then(function (resBody) {
    statusID = resBody.id;
    if (!statusID){
      throw new Error('分析链接失败');
    }

    sails.log.info('分析链接完毕, statusID : ', statusID);
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析链接完毕'});

    // Get status info from weibo API
    emitAnalyzeMsg(socketID, {status: 200, msg: '下载微博数据...'});
    return DataService.downloadStatusInfo(user, statusID)
  }).then(function (status) {
    if (!status){
      throw new Error('下载微博数据失败');
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '下载微博数据完毕'});
    sails.log.info('下载微博数据完毕 : \n', status);


    // If type equal 1 , it means comment
    if (type === 1){
      emitAnalyzeMsg(socketID, {status: 200, msg: '下载评论数据...'});
      return DataService.downloadCommentsOfStatus(user, statusID);
    }

    // TODO if type equal 2, it means repost , download it

  }).then(function (objs) {
    if (!objs){
      throw new Error('下载评论数据失败');
    }
    if (type === 1){
      emitAnalyzeMsg(socketID, {status: 200, msg: '下载评论数据完毕'});
      sails.log.info('下载评论数据完毕 : \n', objs);
    }
    if (type === 2){
      emitAnalyzeMsg(socketID, {status: 200, msg: '下载转发数据完毕'});
      sails.log.info('下载转发数据完毕 : \n', objs);
    }

    // Analyze and generate report
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户分析报告...'});
    return ReportService.generateGenderReport(statusID, type, user);
  }).then(function (report) {
    if (!report){
      throw new Error('分析并生成评论用户分析报告失败');
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户分析报告完毕'});
    sails.log.info('分析并生成报告完毕 : \n', report);

    // Return report
    res.ok({report: report});
  }).catch(function (err) {
    sails.log.error(err);
    res.serverError({
      status: 500,
      msg: err.message || '未知错误'
    });
  });
}

/**
 * Emit analyze_msg event for given client by socket id
 * @param socketID
 * @param response
 */
function emitAnalyzeMsg(socketID, response) {
  if (socketID){
    sails.sockets.emit(socketID, 'analyze_msg', response);
  }
}

