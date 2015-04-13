/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/3/14
 * @description
 * In charge of download data from Weibo API into the local database
 */
var Promise = require("bluebird");

module.exports = {
  downloadStatusInfo          : downloadStatusInfo,
  downloadCommentsOfStatus    : downloadCommentsOfStatus,
  downloadRepost              : downloadRepost
};

/**
 * Download status data from weibo API
 * @param user
 * @param ID
 */
function downloadStatusInfo(user, ID) {
  sails.log.info('DataService.downloadStatusInfo :');
  return WeiboSDK.showStatus(user, ID).then(function (resBody) {

    // if resBody not found , throw an error
    if (!resBody){
      throw new Error('the resBody was not found');
    }

    // pick attributes what is required from resBody
    var newStatus = _.pick(resBody, _.keys(Status.attributes));
    newStatus.user = newStatus.user.id;

    sails.log.info('An new status will be created:');
    sails.log.info(newStatus);

    // delete attributes didn't need
    delete newStatus.geo;

    // i want to know whether the new status is exist
    return Status.findOne(newStatus.id).then(function (status) {

      // if new status not exist, create it
      if (!status){
        return Status.create(newStatus);
      }

      // if new status is exist, update it
      return Status.update({id: status.id}, newStatus);

    }).then(function (status) {

      // if status is array, i just need the first one
      if (_.isArray(status)){
        status = status[0];
      }
      return status;
    });
  })
}

/**
 * Download comments data from weibo API
 * @param user
 * @param statusID
 */
function downloadCommentsOfStatus(user, statusID) {
  sails.log.info('DataService.downloadComments:');
  return WeiboSDK.showCommentsOfStatus(user, statusID).then(function (resBody) {

    // if resBody not found , throw an error
    if (!resBody){
      throw new Error('the resBody was not found');
    }

    // if resBody.comments not found , throw an error
    if (!resBody.comments){
      throw new Error('the resBody did not has comments attribute');
    }

    // push an comments array of resBody.comments for create
    var comments = [];
    var users    = [];
    _.map(resBody.comments, function (comment) {
      var newComments = _.pick(comment, _.keys(Comment.attributes));
      var newUser     = _.pick(newComments.user, _.keys(User.attributes));
      newComments.user = newComments.user.id;
      newComments.status = newComments.status.id;
      if (newComments.reply_comment){
        newComments.reply_comment = newComments.reply_comment.id;
      }
      comments.push(newComments);
      users.push(newUser);
    });

    // update or create user of comments
    return Promise.map(users, function (user) {
      var _user = user;
      return User.findOne(_user.id).then(function (user) {

        // if user is not exist , create it
        if (!user){
          return User.create(_user);
        }

        // if user is exist , update it
        return User.update({id: _user.id}, _user).then(function (users) {
          return users[0];
        });
      })
    }).then(function (users) {
      sails.log.info('Users create goes here:');
      _.map(users, function (user) {
        sails.log.info(user.name);
      });

      // find or create comments
      return Promise.map(comments, function (comment) {
        return Comment.findOrCreate(comment.id , comment);
      });
    }).then(function (comments) {
      sails.log.info('The comments created or found goes here: ');
      _.map(comments, function (comment) {
        sails.log.info(comment.text);
      });
      return comments;
    });
  });
}

/**
 * Download reposts data from weibo API
 * @param ID
 */
function downloadRepost(ID) {

}


