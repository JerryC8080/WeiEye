/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/3/14
 * @description
 *
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
  return WeiboSDK.showStatus(user, ID).then(function (resBody) {
    // pick attributes what is require from resBody
    var newStatus = _.pick(resBody, _.keys(Status.attributes));
    newStatus.user = newStatus.user.id;
    delete newStatus.geo;
    return Status.create(newStatus);
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

