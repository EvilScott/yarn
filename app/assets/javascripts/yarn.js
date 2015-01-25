(function(angular) {
    'use strict';

    var yarn = angular.module('yarn', ['ngResource', 'angularMoment']);

    yarn.factory('Post', function($resource) {
        return $resource('/posts/:id');
    });

    yarn.controller('yarnCtrl', function($scope, Post) {
        $scope.posts = Post.query();
    });

    yarn.directive('post', function($compile) {
        return {
            compile: function(element) {
                var contents = element.contents().remove();
                var compiledContents;
                return {
                    post: function(scope, element) {
                        compiledContents = compiledContents || $compile(contents);
                        compiledContents(scope, function(clone) {
                            element.append(clone);
                        });
                    }
                };
            },
            replace: true,
            restrict: 'E',
            scope: { post: '=' },
            templateUrl: 'templates/post.html'
        };
    });

    yarn.directive('newPost', function(Post) {
        return {
            link: function(scope) {
                scope.postReply = function() {
                    var newPost = new Post({
                        content: scope.newPost,
                        user_id: 2, //TODO get real user_id
                        parent: scope.post ? scope.post.id : null
                    });
                    newPost.$save(function(newPost) {
                        scope.showReply = false;
                        scope.newPost = '';
                        scope.posts.unshift(newPost);
                    });
                }
            },
            restrict: 'E',
            scope: { label: '@', post: '=', posts: '=' },
            templateUrl: 'templates/newPost.html'
        };
    });
})(angular);
