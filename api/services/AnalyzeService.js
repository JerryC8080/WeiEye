/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/26
 * @description
 *
 */


var reportTypes     = sails.config.report.report_types,
    reportTypesKeys = _.keys(reportTypes),
    reportMethods   = {
      'user_source' : analyzeSourceport,
      'user_geo'    : analyzeGeoReport,
      'user_gender' : analyzeGenderReport,
      'user_verify' : analyzeVerifyReport,
      'timeline'    : analyzeTimelineReport
    },
    response  = {
      reports : null,
      comments: null,
      status  : null
    };

module.exports = {
  analyze: analyze
};

/**
 * Analyze target statusID, and return reports
 * if socketID exist , it will emit socket event
 * @param statusID
 * @param user
 * @param socketID
 */
function analyze(statusID, user, type, reportsType, socketID) {

  // Get status info from weibo API
  SocketService.emitEvent("analyze_msg", {status: 200, msg: '下载微博数据...'}, socketID);
  return DataService.downloadStatusInfo(user, statusID).then(function (status) {
    if (!status){
      throw new Error('下载微博数据失败');
    }
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '下载微博数据完毕'}, socketID);
    sails.log.info('下载微博数据完毕 : \n', status);

    // find status populate user
    return Status.findOne(status.id).populate('user');
  }).then(function (status) {
    response.status = status;

    // If type equal 1 , it means comment
    if (type === 1){
      SocketService.emitEvent("analyze_msg", {status: 200, msg: '下载评论数据...'}, socketID);
      return DataService.downloadCommentsOfStatus(user, statusID);
    }

    // TODO if type equal 2, it means repost , download it
  }).then(function (objs) {
    if (!objs || objs.length <= 0){
      throw new Error('下载评论数据失败');
    }
    if (type === 1){
      SocketService.emitEvent("analyze_msg", {status: 200, msg: '下载评论数据完毕'}, socketID);
      sails.log.info('下载评论数据完毕 : \n', objs);
    }
    if (type === 2){
      SocketService.emitEvent("analyze_msg", {status: 200, msg: '下载转发数据完毕'}, socketID);
      sails.log.info('下载转发数据完毕 : \n', objs);
    }

    // find comments populate user
    var commentIds = _.pluck(objs, 'id');
    return Comment.find(commentIds).populate('user');

  }).then(function (comments) {
    response.comments = comments;

    var batch = Date.now();

    // init generate report method
    var doReportMethods = _.map(reportsType, function (key) {
      if (key){
        return reportMethods[key](statusID, type, user, socketID, batch);
      }
      return null;
    });

    // Analyze and generate report on the parallel way
    return Promise.all(doReportMethods);
  }).then(function (reports) {
    if (!reports) {
      throw new Error('分析报告失败');
    }

    // compact reports data
    var reportsData = {};
    _.map(reports, function (report, index) {
      if (!report) {
        return;
      }
      reportsData[reportTypesKeys[index]] = report;
    });
    response.reports = reportsData;

    return response;
  });
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
  SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户性别报告...'}, socketID);
  return ReportService.generateGenderReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      SocketService.emitEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户性别失败'}, socketID);
      return null
    }
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户性别完毕'}, socketID);
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
  SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户来源报告...'}, socketID);
  return ReportService.generateSourceReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      SocketService.emitEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户来源报告失败'}, socketID);
      return null
    }
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户来源报告完毕'}, socketID);
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
  SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户认证报告...'}, socketID);
  return ReportService.generateVerifyReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      SocketService.emitEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户认证报告失败'}, socketID);
      return null
    }
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户认证报告完毕'}, socketID);
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
  SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论时间曲线报告...'}, socketID);
  return ReportService.generateTimelineReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      SocketService.emitEvent("analyze_msg", {status: 500, msg: '分析并生成评论时间曲线报告失败'}, socketID);
      return null
    }
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论时间曲线报告完毕'}, socketID);
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
  SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户地区分布报告...'}, socketID);
  return ReportService.generateGeoReport(statusID, type, user, batchTime).then(function (report) {
    if (!report){
      SocketService.emitEvent("analyze_msg", {status: 500, msg: '分析并生成评论用户地区分布报告失败'}, socketID);
      return null
    }
    SocketService.emitEvent("analyze_msg", {status: 200, msg: '分析并生成评论用户地区分布报告完毕'}, socketID);
    return report || null;
  });
}