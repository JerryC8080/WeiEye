/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var typeText = {
  '评论': 1,
  '转发': 2
};
var reportTypes = sails.config.report.report_types;
var reportTypesKeys = _.keys(reportTypes);
var reportMethods = {
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
      type      = req.body.type;

  sails.log.info(req.body);
  // Check login
  if (!user ){
    return res.badRequest('需要登录');
  }

  // Check intergrity of params
  if (!statusUrl || !type){
    return res.badRequest('参数不全');
  }

  // exchange type into number
  type = typeText[type];

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
    sails.log.info(user);
    sails.log.info(statusID);
    sails.log.info('type', type);
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

    // init generate report method
    var doReportMethods = _.map(reportTypesKeys, function (key) {
      if (req.body[key] === 'on'){
        return reportMethods[key](statusID, type, user, socketID);
      }
      return null;
    });

    // Analyze and generate report on the parallel way
    return Promise.all(doReportMethods);
  }).then(function (reports) {
    if (!reports){
      throw new Error('分析报告失败');
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析报告完毕'});
    sails.log.info('分析报告完毕 : \n', reports);

    // compact reports data
    var responseData = {};
    _.map(reports, function (report, index) {
      if (!report){
        return ;
      }
      responseData[reportTypesKeys[index]] = report;
    });

    // Return report
    res.ok(responseData);
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

/**
 * Analyze gender report use ReportService.generateGenderReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @returns {*}
 */
function analyzeGenderReport(statusID, type, user, socketID) {
  emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户性别报告...'});
  return ReportService.generateGenderReport(statusID, type, user).then(function (report) {
    if (!report){
      emitAnalyzeMsg(socketID, {status: 500, msg: '分析并生成评论用户性别失败'});
      return null
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户性别完毕'});
    return report;
  });
}

/**
 * Analyze source report use ReportService.generateSourceReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @returns {*}
 */
function analyzeSourceport(statusID, type, user, socketID) {
  emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户来源报告...'});
  return ReportService.generateSourceReport(statusID, type, user).then(function (report) {
    if (!report){
      emitAnalyzeMsg(socketID, {status: 500, msg: '分析并生成评论用户来源报告失败'});
      return null
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户来源报告完毕'});
    return report || null;
  });
}

/**
 * Analyze verify report use ReportService.generateVerifyReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @returns {*}
 */
function analyzeVerifyReport(statusID, type, user, socketID) {
  emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户认证报告...'});
  return ReportService.generateVerifyReport(statusID, type, user).then(function (report) {
    if (!report){
      emitAnalyzeMsg(socketID, {status: 500, msg: '分析并生成评论用户认证报告失败'});
      return null
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户认证报告完毕'});
    return report || null;
  });
}

/**
 * Analyze timeline report use ReportService.generateTimelineReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @returns {*}
 */
function analyzeTimelineReport(statusID, type, user, socketID) {
  emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论时间曲线报告...'});
  return ReportService.generateTimelineReport(statusID, type, user).then(function (report) {
    if (!report){
      emitAnalyzeMsg(socketID, {status: 500, msg: '分析并生成评论时间曲线报告失败'});
      return null
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论时间曲线报告完毕'});
    return report || null;
  });
}

/**
 * Analyze geo report use ReportService.generateGeoReport
 * @param statusID
 * @param type
 * @param user
 * @param socketID
 * @returns {*}
 */
function analyzeGeoReport(statusID, type, user, socketID) {
  emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户地区分布报告...'});
  return ReportService.generateGeoReport(statusID, type, user).then(function (report) {
    if (!report){
      emitAnalyzeMsg(socketID, {status: 500, msg: '分析并生成评论用户地区分布报告失败'});
      return null
    }
    emitAnalyzeMsg(socketID, {status: 200, msg: '分析并生成评论用户地区分布报告完毕'});
    return report || null;
  });
}