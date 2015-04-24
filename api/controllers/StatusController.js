/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getMyAnalyzeStatus: function (req, res) {

    // TODO should close '2254858394'
    var user = req.session.passport && req.session.passport.user || '2254858394';
    if (!user){
      return res.forbidden('need login');
    }
    Report.find({creater: user}).populate('status').then(function (reports) {
      var status = _.uniq(_.pluck(reports, 'status'), 'id');
      res.json(status);
    }).catch(function (error) {
      res.serverError(error);
    });
  }
};

