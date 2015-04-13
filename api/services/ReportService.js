/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/3/14
 * @description
 *
 */

module.exports = {
  generateGenderReport: generateGenderReport
};

/**
 * Format data within database and create report on the database
 * @param statusID
 * @param type , the type of report, type can be 1(comment) or 2 (retweeted status)
 */
function generateGenderReport(statusID, type, sessionUser) {
  sails.log.info('ReportService.generateGenderReport:');
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
    method(statusID).then(function (users) {
      if (!users || users.length <= 0){
        reject(new Error('can not find user by given status comments'));
      }

      // grouping user by gender
      var userGroup = _.groupBy(users, 'gender');

      // init report template
      var pieTpl    = sails.config.echart.templates.pie;
      pieTpl.title.text  = '评论用户性别分析报告';
      pieTpl.legend.data = ['男', '女'];
      pieTpl.series[0].data = [
        {value: userGroup['m'].length || 0, name: '男'},
        {value: userGroup['f'].length || 0, name: '女'}
      ];

      // generate the new report
      var newReport = {
        target      : 1,
        data        : JSON.stringify(pieTpl),
        status      : statusID,
        reportType  : sails.config.report.report_types.user_gender.id,
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