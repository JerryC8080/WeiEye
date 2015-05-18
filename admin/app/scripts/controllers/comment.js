'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
  .controller('CommentCtrl', function ($scope, Comment, $http, DS, notify) {

    $scope.items_per_page = 10;   // 每页显示的记录数
    $scope.maxSize = 5;           // 页数显示的数目 如 1，2，3，4，5 ，如果是 4 的话，便是 1，2，3，4
    $scope.totalItems;            // 总记录数
    $scope.currentPage = 1;       // 当前页数
    $scope.query = "";            // 查询输入框的值
    $scope.isQuery = false;       // 判断 查询输入框的值 是否不为空

    count();                      // 获得总记录数
    initUsers();                  // 获得当前页数的 User 数组

    // 处理页数改变的时候的函数
    $scope.pageChanged = function () {
      initUsers();
    };

    //查询
    $scope.search = function () {
      $scope.currentPage = 1;
      if ($scope.query === "" || $scope.query === null) {
        $scope.isQuery = false;
      } else {
        $scope.isQuery = true;
      }
      count();
      initUsers();
    };

    // 删除一条记录
    $scope.deleteUser = function ($index) {
      Comment.destroy($index)
        .then(function (data) {
          $scope.totalItems--;
          angular.forEach($scope.users, function (value, key) {
            if (value.id === $index) {
              $scope.users.splice(key, 1);
            }
          });
          notify({ message: '删除成功', classes: 'alert-success'});
        }).catch(function (err) {
          notify({ message: '删除失败' + err, classes: 'alert-danger'});
        });

    };

    // open modal
    $scope.openModal = function (User) {
      var modalInstance = $modal.open({
        templateUrl: 'views/User/modal.html',
        controller: 'UserModalCtrl',
        resolve: {
          User: function () {
            return angular.copy(User);
          }
        }
      });

      modalInstance.result.then(function (result) {

      }), function () {
        $log.info('Modal dismissed at: ' + new Date());
      }
    };


    function getParams() {
      var query = {
        sort: 'createdAt DESC',
        limit: $scope.items_per_page,
        skip: ($scope.currentPage - 1) * $scope.items_per_page
      };

      //如果有查询值的话，添加 where 参数
      if ($scope.isQuery) {
        query.where = {"text": {"contains": $scope.query}};
      }

      return query;
    }

    // 获得当前页数的 User 数组
    function initUsers() {

      Comment.findAll(getParams()).then(function (data) {
        $scope.comments = data;
      });
    }

    function count() {
      var url = DS.defaults.domain + 'api/status/count';
      if ($scope.isQuery) {
        url = url + '/?where={"username":{"contains":"' + $scope.query + '"}}';
      }
      $http.get(url).success(function (data, status, headers, config) {
        $scope.totalItems = data.count;
      }).error(function (data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  });
