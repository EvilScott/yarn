(function(angular) {
    'use strict';

    angular.module('yarn').controller('yarnCtrl', function($scope, Post) {
        $scope.posts = Post.query();
    });
})(angular);
