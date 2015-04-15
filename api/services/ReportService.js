/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/3/14
 * @description
 *
 */

var moment = require("moment");

var reportTemplates = sails.config.echart.templates,
    reportTypes     = sails.config.report.report_types;

module.exports = {
  generateGenderReport: generateGenderReport,
  generateSourceReport: generateSourceReport,
  generateVerifyReport: generateVerifyReport,
  generateTimelineReport: generateTimelineReport
};

/**
 * Format data within database and create gender report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 * @param sessionUser
 */
function generateGenderReport(statusID, type, sessionUser) {
  sails.log.info('ReportService.generateGenderReport:');
  return getUserOfType(statusID, type).then(function (users) {
    if (!users || users.length <= 0){
      throw new Error('can not find user by given status comments');
    }

    // grouping user by gender
    var userGroup = _.groupBy(users, 'gender');

    // init report template
    var pieTpl    = reportTemplates.pie;
    pieTpl.title.text  = '评论用户性别分析报告';
    pieTpl.legend.data = ['男', '女'];
    pieTpl.series[0].data = [
      {value: userGroup['m'].length || 0, name: '男'},
      {value: userGroup['f'].length || 0, name: '女'}
    ];

    // generate the new report
    var newReport = {
      type        : 1,
      data        : JSON.stringify(pieTpl),
      status      : statusID,
      reportType  : reportTypes.user_gender.id,
      creater     : sessionUser
    };
    return Report.create(newReport).then(function (report) {
      if (!report){
        throw new Error('can not create the new report');
      }
      sails.log.info('A new report has been created:');
      sails.log.info(report);
      return report;
    });
  })
}

/**
 * Format data within database and create source report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 * @param sessionUser
 */
function generateSourceReport(statusID, type, sessionUser) {
  sails.log.info('ReportService.generateSourceReport:');
  return getCommentOrRetweetedStatus(statusID, type).then(function (objs) {
    if (!objs || objs.length <= 0){
      throw new Error('can not find user by given status comments');
    }

    // grouping user by source
    var objsGroup = _.groupBy(objs, 'source');

    // analyze data
    var sourceKeys = _.keys(objsGroup);
    var sourceCounts = [];
    _.forEach(sourceKeys, function (key) {
      sourceCounts.push(objsGroup[key].length);
    });

    // init report template
    var rainbowBarTpl = reportTemplates.bar;
    rainbowBarTpl.title.text = '评论用户来源分析报告';
    rainbowBarTpl.series[0].name = '来源统计';
    rainbowBarTpl.xAxis[0].data = sourceKeys;
    rainbowBarTpl.series[0].data = sourceCounts;

    // generate the new report
    var newReport = {
      type        : 1,
      data        : JSON.stringify(rainbowBarTpl),
      status      : statusID,
      reportType  : reportTypes.user_source.id,
      creater     : sessionUser
    };
    return Report.create(newReport).then(function (report) {
      if (!report){
        throw new Error('can not create the new report');
      }
      sails.log.info('A new report has been created:');
      sails.log.info(report);
      return report;
    })
  })
}

/**
 * Format data within database and create verify report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 * @param sessionUser
 */
function generateVerifyReport(statusID, type, sessionUser) {
  sails.log.info('ReportService.generateVerifyReport:');
  return getUserOfType(statusID, type).then(function (users) {
    if (!users || users.length <= 0){
      throw new Error('can not find user by given status comments');
    }

    // grouping user by verified
    var userGroup = _.groupBy(users, 'verified');

    // init report template
    var ringPieTpl    = reportTemplates.ring_pie;
    ringPieTpl.title.text  = '评论用户认证分析报告';
    ringPieTpl.legend.data = ['已认证', '未认证'];
    ringPieTpl.series[0].data = [
      {value: userGroup['true'] && userGroup['true'].length || 0, name: '已认证'},
      {value: userGroup['false'] && userGroup['false'].length || 0, name: '未认证'}
    ];

    // generate the new report
    var newReport = {
      type        : 1,
      data        : JSON.stringify(ringPieTpl),
      status      : statusID,
      reportType  : reportTypes.user_verify.id,
      creater     : sessionUser
    };
    return Report.create(newReport).then(function (report) {
      if (!report){
        throw new Error('can not create the new report');
      }
      sails.log.info('A new report has been created:');
      sails.log.info(report);
      return report;
    });
  });
}

/**
 * Format data within database and create timeline report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 * @param sessionUser
 */
function generateTimelineReport(statusID, type, sessionUser) {
  return getCommentOrRetweetedStatus(statusID, type).then(function (objs) {
    if (!objs || objs.length <= 0){
      throw new Error('can not find user by given status comments');
    }
    var timeFormater = 'YYYY/MM/DD HH:mm';

    // created time will be loss of accuracy 10min
    var createTimes = _.sortBy(_.map(objs, function (obj) {
      var timestamp = obj.created_at.valueOf();
      var perTenMin = Math.ceil(timestamp/1000/60/10);
      var tenMinTimeStamp = perTenMin * 1000 * 60 * 10;
      return moment(tenMinTimeStamp).format(timeFormater);
    }));

    // generate xAxisData
    var maxTime = moment(_.last(createTimes), timeFormater).valueOf();
    var minTime = moment(_.first(createTimes), timeFormater).valueOf();
    var temMin = 1000 * 60 * 10;
    var scopeTime = [];
    for (var i = 0; minTime + (i * temMin) < maxTime ; i++) {
      scopeTime.push(minTime + (i * temMin));
    }
    scopeTime.push(maxTime);
    var xAxisData = _.map(scopeTime, function (time) {
      return moment(time).format(timeFormater);
    });

    // group by timestamp
    var timeGroup = _.groupBy(createTimes);

    // generate seriesData
    var seriesData = _.map(xAxisData, function (key) {
      return timeGroup[key] && timeGroup[key].length || 0;
    });

    // calculate the max y number
    var maxLength = _.last(_.sortBy(_.map(timeGroup, function (time) {
      return time.length;
    })));
    var yAxisMax = Math.ceil(maxLength / 5) * 5;

    // init report template
    var rainbowBarTpl = reportTemplates.area;
    rainbowBarTpl.title.text = '评论时间曲线报告';
    rainbowBarTpl.series[0].name = '评论';
    rainbowBarTpl.yAxis[0].name = '评论';
    rainbowBarTpl.yAxis[0].max = yAxisMax;
    rainbowBarTpl.xAxis[0].data = xAxisData;
    rainbowBarTpl.series[0].data = seriesData;

    // generate the new report
    var newReport = {
      type        : 1,
      data        : JSON.stringify(rainbowBarTpl),
      status      : statusID,
      reportType  : reportTypes.timeline.id,
      creater     : sessionUser
    };
    return Report.create(newReport).then(function (report) {
      if (!report){
        throw new Error('can not create the new report');
      }
      sails.log.info('A new report has been created:');
      sails.log.info(report);
      return report;
    });
  })
}

/**
 * Get comments or retweeted status of the given type
 * @param statusID
 * @param type
 */
function getCommentOrRetweetedStatus(statusID, type) {
  return new Promise(function (resolve, reject) {
    var method;

    switch(type){
      case 1:
        method = getCommentByStatus;
        break;
      case 2:
        method = getRetweetedStatusByStatus;
        break;
      default:
        method = null;
    }

    // If no model match given type , throw an error
    if (!method){
      return reject(new Error('no method match the type of ' + type));
    }
    return method(statusID).then(function (objs) {
      resolve(objs);
    });
  });
}

/**
 * Get comments of the given status
 * @param statusID
 */
function getCommentByStatus(statusID) {
  return Comment.find({status: statusID});
}

/**
 * Get retweeted status of the given status
 * @param statusID
 * TODO finish
 */
function getRetweetedStatusByStatus(statusID) {

}

/**
 * Get users of the given type
 * @param statusID
 * @param type
 * @returns {Promise}
 */
function getUserOfType(statusID, type) {
  return new Promise(function (resolve, reject) {

    // Match method of given type
    var method;
    switch(type){
      case 1:
        method = getCommentUserByStatus;
        break;
      case 2:
        method = getStatusUserByStatus;
        break;
      default:
        method = null;
    }

    // If no model match given type , throw an error
    if (!method){
      return reject(new Error('no method match the type of ' + type));
    }
    return method(statusID).then(function (users) {
      resolve(users);
    });
  });
}

/**
 * Get comment user by given status
 * @param statusID
 */
function getCommentUserByStatus(statusID) {
  return Comment.find({status: statusID}).populate('user').then(function (comments) {
    // We should remove the duplicate user
    return _.uniq(_.map(comments, function (comment) {
      return comment && comment.user || false;
    }), 'id');
  })
}

/**
 * Get comment user by given status
 * @param statusID
 * @TODO To finish
 */
function getStatusUserByStatus(statusID) {

}