(function(angular) {
    'use strict';

    angular.module('yarn').controller('yarnCtrl', function($scope, $http, Post, userState) {
        Post.get(function(response) {
            $scope.posts = response.posts;
            $scope.nextPage = response.nextPage;
        });

        $scope.$watch(function() { return userState.loggedIn; }, function() {
            $scope.loggedIn = userState.loggedIn;
        });

        $scope.getMore = function(nextPageUrl) {
            $http.get(nextPageUrl).success(function(data) {
                $scope.posts.push.apply($scope.posts, data.posts);
                $scope.nextPage = data.nextPage;
            });
        };
    });
})(angular);
