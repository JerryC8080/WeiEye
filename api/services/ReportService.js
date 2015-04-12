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
 * @TODO To finish
 */
function generateGenderReport(statusID, type) {
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
      sails.log.info(users);
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
      return comment.user;
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