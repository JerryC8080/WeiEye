/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/3/14
 * @description
 * In charge of download data from Weibo API into the local database
 */

module.exports = {
  downloadStatusInfo : downloadStatusInfo,
  downloadComments   : downloadComments,
  downloadRepost     : downloadRepost,
  translateMIDToID   : translateMIDToID
};

/**
 * Download status data from weibo API
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

    sails.log.info('An new status will be create:');
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
 * @param ID
 */
function downloadComments(ID) {

}

/**
 * Download reposts data from weibo API
 * @param ID
 */
function downloadRepost(ID) {

}

/**
 * Send request to remote in order to translate status's MID to ID
 * @param statusMID
 * @returns {id}
 */
function translateMIDToID(statusMID) {
  return id;
}

