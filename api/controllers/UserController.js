/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = _.merge(
  _.cloneDeep(require('./base/count')), {

    // TODO should close '2254858394'
    getCurrentUser: function (req, res) {
      var user = req.session.passport.user || '2254858394';
      if (!user){
        return res.json('null');
      }
      User.findOne(user).populate('passports').then(function (user) {
        var _user = _.pick(user, [
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
        ]);
        if (user.passports && user.passports[0]){
          _user.access_token = user.passports[0].tokens.accessToken;
        }
        res.json(_user);
      })
    }
  }
);

