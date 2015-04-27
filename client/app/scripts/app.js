'use strict';

/**
 * @ngdoc overview
 * @name weiEyeApp
 * @description
 * # weiEyeApp
 *
 * Main module of the application.
 */
angular
  .module('weiEyeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'cgNotify'
  ])
  .run(function (CONFIG, User, $http, $log) {
    $http
      // TODO should change the url to '/user/getCurrentUser'
      .get(CONFIG.apiUrl + '/user/getCurrentUser')
      .then(function (res) {
        var user = res.data;
        if (user && user !== 'null'){
          User.setUser(user);
        }
      });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/analyze', {
        templateUrl: 'views/analyze.html',
        controller: 'AnalyzeCtrl'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login-form.html',
        controller: 'LoginFormCtrl'
      })
      .when('/user-center', {
        templateUrl: 'views/user-center.html',
        controller: 'UserCenterCtrl'
      })
      .when('/my-analyze', {
        templateUrl: 'views/my-analyze.html',
        controller: 'MyAnalyzeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
