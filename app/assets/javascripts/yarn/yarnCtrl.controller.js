(function(angular) {
    'use strict';

    angular.module('yarn').controller('yarnCtrl', function($scope, Post, userState) {
        $scope.posts = Post.query();
        $scope.$watch(function() { return userState.loggedIn; }, function() {
            $scope.loggedIn = userState.loggedIn;
        });
    });
})(angular);
