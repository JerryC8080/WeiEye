/**
 * Copyright (c) 2014 JerryC, All rights reserved.
 * http://www.huang-jerryc.com/
 * @author JerryC
 * @date  15/4/10
 * @description
 * Creeper for Weibo
 */

var cheerio = require("cheerio"),
    request = require("superagent");

module.exports = {
  creepStatus: creepStatus
};

/**
 * Creep status info from weibo website with the statusUrl
 * and then return data which can match model Status
 * @param user
 * @param statusUrl
 */
function creepStatus(user, statusUrl) {
  return new Promise(function (resolve, reject) {
    var status = {};

    // translate MID to ID
    var ID = statusUrl.split('?')[0].split('/')[4];
    WeiboSDK.queryID(user, ID, 1, 1).then(function (resBody) {
      status.mid = resBody.id;

      // creep status from statusUrl
      Utils.requestGet(statusUrl).then(function (data) {
        // TODO Analyze the html and get information what's we need
        var $ = cheerio.load(data.text);
        resolve(text);
      })
    });


    // analyze html and get the attribute what's we need
  });
}

