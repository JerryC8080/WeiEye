'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
  .controller('SidebarCtrl', function ($scope) {

    $scope.menu = [
      {
        id: 0,
        title: '用户管理',
        isActive: false,
        main: [
          {
            label: '全部用户',
            route: '/users'
          }
        ]
      },
      {
        id: 2,
        title: '其他',
        isActive: false,
        main: [
          {
            label: '关于',
            route: '/about'
          },{
            label: '联系',
            route: '/contact'
          }
        ]
      }
    ];

    $scope.activeID = 999;

    $scope.toggleMenu = function (id,level) {
      if (level == 0) {
        $scope.menu[id].isActive = !$scope.menu[id].isActive;
      }
      $scope.activeID = id;
    };

  });
