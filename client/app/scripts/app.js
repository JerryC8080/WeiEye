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
    'ui.bootstrap'
  ])
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
      .otherwise({
        redirectTo: '/'
      });
  });
