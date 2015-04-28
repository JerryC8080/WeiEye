'use strict';

/**
 * @ngdoc overview
 * @name adminApp
 * @description
 * # adminApp
 *
 * Main module of the application.
 */
angular
  .module('adminApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'js-data',
    'cgNotify'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login',{
        templateUrl: 'views/partials/login.html'
      })
      .when('/users',{
        templateUrl: 'views/user/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:id', {
        templateUrl: 'views/user/user.html',
        controller: 'UserCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/statuses', {
        templateUrl: 'views/statuses.html',
        controller: 'StatusesCtrl'
      })
      .when('/comments', {
        templateUrl: 'views/comments.html',
        controller: 'CommentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function (DSProvider) {
    DSProvider.defaults.basePath = 'http://localhost:1337/api/';
    DSProvider.defaults.baseUrl = 'http://localhost:1337/api/';
    DSProvider.defaults.domain = 'http://localhost:1337/';
  });
