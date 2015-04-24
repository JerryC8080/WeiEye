'use strict';

/**
 * @ngdoc service
 * @name weiEyeApp.User
 * @description
 * # User
 * Service in the weiEyeApp.
 */
angular.module('weiEyeApp')
  .factory('User', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var User = {};

    return {
      getUser: function () {
        return User;
      },
      setUser: function (user) {

        // clear User before copy value
        var keysUser = Object.keys(User);
        for (var i = 0; i < arguments.length; i++) {
          delete User[keysUser[i]];
        }

        // just copy the value of user;
        var keys = Object.keys(user);
        for (var j = 0; j < keys.length; j++) {
          User[keys[j]] = user[keys[j]] ;
        }
      }
    }
  });
