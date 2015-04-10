/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/10
 * @description
 *
 */
var request = require("superagent");

module.exports = {
  requestGet: requestGet,
  requestPost: requestPost
};


/**
 * Http request of get method
 * @param url
 * @param data
 * @returns {bluebird}
 */
function requestGet(url, data) {
  return new Promise(function (resolve, reject) {
    request
      .get(url)
      .query(data)
      .end(function(err, res){
        if (err){
          reject(err);
        }
        resolve(res);
      });
  });
}

/**
 * Http request of post method
 * @param url
 * @param data
 */
function requestPost(url, data) {
  return new Promise(function (resolve, reject) {
    request
      .post(url)
      .send(data)
      .end(function(err, res){
        if (err){
          reject(err);
        }
        resolve(res);
      });
  });
}
