/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getReportsByStatusID : getReportsByStatusID
};

function getReportsByStatusID(req, res) {
  var statusID = req.query.statusID,
      response = {};

  if (!statusID || statusID === 'null'){
    return res.badRequest('参数不全');
  }
  // find status info
  Status.findOne(statusID).populate('user').then(function (status) {
    if (!status){
      throw new Error('找不到id为\'' + statusID + '\'的微博');
    }

    // set in status
    response.status = status;

    // find comments of status;
    return Comment.find({status: status.id}).populate('user');
  }).then(function (comments) {

    // set in comments if it's exist
    if (comments && comments.length > 0) {
      response.comments = comments;
    }

    // find reports of status
    return Report.find({status: statusID});
  }).then(function (reports) {

    // group comments by batch
    if (reports && reports.length > 0){
      response.reports = _.groupBy(reports, 'batch');
    }

    res.json(response);
  }).catch(function (error) {
    sails.log.error(error);
    res.serverError(error);
  });
}
