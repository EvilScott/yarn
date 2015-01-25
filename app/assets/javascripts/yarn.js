(function(angular) {
    'use strict';

    var yarn = angular.module('yarn', ['ngResource', 'angularMoment']);

    yarn.factory('Post', function($resource) {
        return $resource('/posts/:id');
    });

    yarn.controller('yarnCtrl', function($scope, Post) {
        $scope.posts = Post.query();
    });

    yarn.directive('post', function($compile, Post) {
        return {
            compile: function(element) {
                var contents = element.contents().remove();
                var compiledContents;
                return {
                    post: function(scope, element) {
                        if (!compiledContents) {
                            compiledContents = $compile(contents);
                        }
                        compiledContents(scope, function(clone) {
                            element.append(clone);
                        });
                        scope.showReply = false;
                        scope.postReply = function() {
                            var newPost = new Post({
                                content: scope.reply,
                                user_id: 2, //TODO get real user_id
                                parent: scope.post.id
                            });
                            newPost.$save(function(newPost) {
                                scope.showReply = false;
                                scope.reply = '';
                                scope.post.posts.unshift(newPost);
                            });
                        }
                    }
                };
            },
            replace: true,
            restrict: 'E',
            scope: { post: '=' },
            templateUrl: 'templates/post.html'
        };
    })
})(angular);
