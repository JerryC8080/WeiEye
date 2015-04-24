/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = _.merge(
  _.cloneDeep(require('./base/count')), {

    // custom action goes here
    getCurrentUser: function (req, res) {
      var user = req.session.passport.user;
      if (!user){
        return res.json('null');
      }
      User.findOne(user).then(function (user) {
        res.json(_.pick(user, [
          'id',
          'screen_name',
          'location',
          'description',
          'url',
          'profile_image_url',
          'avatar_large',
          'avatar_hd',
          'gender',
          'followers_count',
          'friends_count',
          'statuses_count',
          'favourites_count',
          'created_at',
          'verified'
        ]));
      })
    },

    // TODO should colse this method
    getJC: function (req, res) {
      User.findOne(2254858394).then(function (user) {
        res.json(_.pick(user, [
          'id',
          'screen_name',
          'location',
          'description',
          'url',
          'profile_image_url',
          'avatar_large',
          'avatar_hd',
          'gender',
          'followers_count',
          'friends_count',
          'statuses_count',
          'favourites_count',
          'created_at',
          'verified'
        ]));
      })
    }
  }
);

