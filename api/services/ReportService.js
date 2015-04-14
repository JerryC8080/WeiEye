/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/3/14
 * @description
 *
 */

var reportTemplates = sails.config.echart.templates,
    reportTypes     = sails.config.report.report_types;

module.exports = {
  generateGenderReport: generateGenderReport,
  generateSourceReport: generateSourceReport
};

/**
 * Format data within database and create gender report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 * @param sessionUser
 */
function generateGenderReport(statusID, type, sessionUser) {
  sails.log.info('ReportService.generateGenderReport:');
  return new Promise(function (resolve, reject) {
    getUserOfType(statusID, type).then(function (users) {
      if (!users || users.length <= 0){
        reject(new Error('can not find user by given status comments'));
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
      Report.create(newReport).then(function (report) {
        if (!report){
          reject(new Error('can not create the new report'));
        }
        sails.log.info('A new report has been created:');
        sails.log.info(report);
        resolve(report);
      });
    })
  });
}

/**
 * Format data within database and create source report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 * @param sessionUser
 */
function generateSourceReport(statusID, type, sessionUser) {
  sails.log.info('ReportService.generateSourceReport:');
  return new Promise(function (resolve, reject) {
    getCommentOrRetweetedStatus(statusID, type).then(function (objs) {
      if (!objs || objs.length <= 0){
        reject(new Error('can not find user by given status comments'));
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
      Report.create(newReport).then(function (report) {
        if (!report){
          reject(new Error('can not create the new report'));
        }
        sails.log.info('A new report has been created:');
        sails.log.info(report);
        resolve(report);
      })
    })
  });
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
      return comment && comment.user;
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