/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var typeText        = {'评论': 1, '转发': 2},
    reportTypes     = sails.config.report.report_types,
    reportTypesKeys = _.keys(reportTypes),
    reportMethods   = {
      'user_source' : analyzeSourceport,
      'user_geo'    : analyzeGeoReport,
      'user_gender' : analyzeGenderReport,
      'user_verify' : analyzeVerifyReport,
      'timeline'    : analyzeTimelineReport
    };

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
      type      = '评论',
      response  = {
        reports : null,
        comments: null,
        status  : null
      };


  // Get socket id if it's socket request
  if (isSocket){
    socketID = sails.sockets.id(req.socket)
  }

  // Check login
  if (!user ){
    sails.log.error('需要登录');
    if (isSocket){
      return emitSocketEvent("analyze_msg", {status: 400, msg: '需要登录'}, socketID);
    }
    return res.badRequest('需要登录');
  }

  // Check intergrity of params
  if (!statusUrl || !type){
    sails.log.error('参数不全');
    if (isSocket){
      return emitSocketEvent("analyze_msg", {status: 400, msg: '参数不全'}, socketID);
    }
    return res.badRequest('参数不全');
  }

  // exchange type into number
  type = typeText[type];
  sails.log.info('分析开始');


  // Translate MID to ID
  var MID = statusUrl.split('?')[0].split('/')[4];

  emitSocketEvent("analyze_msg", {status: 200, msg: '分析链接...'}, socketID);
  WeiboSDK.queryID(user, MID, type, 1).then(function (resBody) {
    statusID = resBody.id;
    if (!statusID){
      throw new Error('分析链接失败');
    }
    sails.log.info('分析链接完毕, statusID : ', statusID);
    emitSocketEvent("analyze_msg", {status: 200, msg: '分析链接完毕'}, socketID);

    // Get status info from weibo API
    emitSocketEvent("analyze_msg", {status: 200, msg: '下载微博数据...'}, socketID);
    return DataService.downloadStatusInfo(user, statusID)
  }).then(function (status) {
    if (!status){
      throw new Error('下载微博数据失败');
    }
    emitSocketEvent("analyze_msg", {status: 200, msg: '下载微博数据完毕'}, socketID);
    sails.log.info('下载微博数据完毕 : \n', status);

    // find status populate user
    return Status.findOne(status.id).populate('user');
  }).then(function (status) {
    response.status = status;

    // If type equal 1 , it means comment
    if (type === 1){
      emitSocketEvent("analyze_msg", {status: 200, msg: '下载评论数据...'}, socketID);
      return DataService.downloadCommentsOfStatus(user, statusID);
    }

    // TODO if type equal 2, it means repost , download it
  }).then(function (objs) {
    if (!objs){
      throw new Error('下载评论数据失败');
    }
    if (type === 1){
      emitSocketEvent("analyze_msg", {status: 200, msg: '下载评论数据完毕'}, socketID);
      sails.log.info('下载评论数据完毕 : \n', objs);
    }
    if (type === 2){
      emitSocketEvent("analyze_msg", {status: 200, msg: '下载转发数据完毕'}, socketID);
      sails.log.info('下载转发数据完毕 : \n', objs);
    }

    // find comments populate user
    var commentIds = _.pluck(objs, 'id');
    return Comment.find(commentIds).populate('user');

  }).then(function (comments) {
    response.comments = comments;

    var batch = Date.now();

    // init generate report method
    var doReportMethods = _.map(reportTypesKeys, function (key) {
      if (req.body[key]){
        return reportMethods[key](statusID, type, user, socketID, batch);
      }
      return null;
    });

    // Analyze and generate report on the parallel way
    return Promise.all(doReportMethods);
  }).then(function (reports) {
    if (!reports){
      throw new Error('分析报告失败');
    }

    // compact reports data
    var reportsData = {};
    _.map(reports, function (report, index) {
      if (!report){
        return ;
      }
      reportsData[reportTypesKeys[index]] = report;
    });
    response.reports = reportsData;

    // Return report
    emitSocketEvent("analyze_completed", {
      status: 200,
      msg: '分析报告完毕',
      data: response
    }, socketID);
    sails.log.info('分析报告完毕 : \n', reports);
  }).catch(function (err) {
    sails.log.error(err);
    res.json({
      status: 500,
      msg: err.message || '未知错误'
    });
  });
}

/**
 * Emit analyze_msg event for given client by socket id
 * @param eventName
 * @param socketID
 * @param response
 */
function emitSocketEvent(eventName, response, socketID) {
  if (socketID){
    sails.sockets.emit(socketID, eventName, response);
  }
}

/**
 * Analyze gender report use ReportService.generateGenderReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @param batchTime
 * @returns {*}
 */
function analyzeGenderReport(statusID, type, user, socketID, batchTime) {
  emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户性别报告...'}, socketID);
  return ReportService.generateGenderReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      emitSocketEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户性别失败'}, socketID);
      return null
    }
    emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户性别完毕'}, socketID);
    return report;
  });
}

/**
 * Analyze source report use ReportService.generateSourceReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @param batchTime
 * @returns {*}
 */
function analyzeSourceport(statusID, type, user, socketID, batchTime) {
  emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户来源报告...'}, socketID);
  return ReportService.generateSourceReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      emitSocketEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户来源报告失败'}, socketID);
      return null
    }
    emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户来源报告完毕'}, socketID);
    return report || null;
  });
}

/**
 * Analyze verify report use ReportService.generateVerifyReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @param batchTime
 * @returns {*}
 */
function analyzeVerifyReport(statusID, type, user, socketID, batchTime) {
  emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户认证报告...'}, socketID);
  return ReportService.generateVerifyReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      emitSocketEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户认证报告失败'}, socketID);
      return null
    }
    emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户认证报告完毕'}, socketID);
    return report || null;
  });
}

/**
 * Analyze timeline report use ReportService.generateTimelineReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @param batchTime
 * @returns {*}
 */
function analyzeTimelineReport(statusID, type, user, socketID, batchTime) {
  emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论时间曲线报告...'}, socketID);
  return ReportService.generateTimelineReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      emitSocketEvent("analyze_msg", {status: 500, msg: '分析并生成评论时间曲线报告失败'}, socketID);
      return null
    }
    emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论时间曲线报告完毕'}, socketID);
    return report || null;
  });
}

/**
 * Analyze geo report use ReportService.generateGeoReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @param batchTime
 * @returns {*}
 */
function analyzeGeoReport(statusID, type, user, socketID, batchTime) {
  emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户地区分布报告...'}, socketID);
  return ReportService.generateGeoReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      emitSocketEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户地区分布报告失败'}, socketID);
      return null
    }
    emitSocketEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户地区分布报告完毕'}, socketID);
    return report || null;
  });
}