/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = _.merge(_.cloneDeep(require('./base/count')), {
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
  },

  // TODO should close '2254858394'
  getMyTimeline: function (req, res) {
    var user = req.session.passport.user || 2254858394;
    if (!user){
      return res.forbidden('need login');
    }
    WeiboSDK.showUserTimeline(user).then(function (resData) {
      if (resData.statuses){
        return res.json(resData.statuses);
      }
      res.badRequest();
    }).catch(function (error) {
      res.serverError(error);
    })
  }
});

