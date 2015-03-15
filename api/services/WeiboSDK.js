/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/3/15
 * @description
 *
 */

/**
 * Constant goes here
 */
var API_URL = {
  statuses_queryid : 'https://api.weibo.com/2/statuses/queryid.json'
};

/**
 * Dependency goes here
 */
var Promise = require("bluebird"),
    request = require("superagent");

module.exports = {
  queryID       : queryID,
  showStatus    : showStatus
};

/**
 * Query ID with MID
 * @param user
 * @param MID
 * @param type
 * @param isBase62
 */
function queryID(user, MID, type, isBase62) {
  // get access_token
  return getAccessToken(user).then(function (access_token) {
    if (!access_token){
      throw new Error('get access_token failed');
    }
    return new Promise(function (resolve, reject) {
      request
        .get(API_URL.statuses_queryid)
        .query({
          access_token  : access_token,
          mid           : MID,
          type          : type,
          isBase62      : isBase62
        })
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err){
            reject(err);
          }
          resolve(res.body);
        });
    });
  });
}

/**
 * Show status info
 * @param user
 * @param ID
 */
function showStatus(user, ID) {

}

/**
 * Query user's accessToken
 * @param user
 */
function getAccessToken(user) {
  return Passport.findOne({user: user, provider: 'sina'}).then(function (passport) {
    if (!passport){
      throw new Error('can\'t find passport');
    }
    return  access_token = passport.tokens.accessToken;
  });
}