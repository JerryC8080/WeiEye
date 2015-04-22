/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var fs = require('fs');
var path = require('path');
var clientApp = path.resolve(__dirname,'../../.tmp/public/client/index.html');
var adminApp = path.resolve(__dirname,'../../.tmp/public/admin/index.html');


module.exports = {
	index: function (req, res) {
    res.view('homepage', {
      user: req.user
    });
  },
  client: function (req, res) {
    fs.exists(clientApp + '', function(exists) {
      if (!exists) {
        return res.notFound('The requested file does not exist.');
      }
      fs.createReadStream(clientApp).pipe(res);
    });
  },
  admin: function (req, res) {
    fs.exists(adminApp + '', function(exists) {
      if (!exists) {
        return res.notFound('The requested file does not exist.');
      }
      fs.createReadStream(adminApp).pipe(res);
    });
  }
};

