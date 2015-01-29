(function(angular) {
    'use strict';

    angular.module('yarn').directive('newPost', function($cookies, $timeout, Post) {
        return {
            link: function(scope, element) {
                scope.$watch('showReply', function(showReply) {
                    if (showReply) {
                        $timeout(function() {
                            element.find('form input').focus();
                        }, 0);
                    }
                });

                scope.postReply = function() {
                    var newPost = new Post({
                        content: scope.newPost,
                        user_token: $cookies.token,
                        parent: scope.post ? scope.post.id : null
                    });
                    newPost.$save(function(newPost) {
                        scope.showReply = false;
                        scope.newPost = '';
                        scope.posts.unshift(newPost);
                    });
                };
            },
            restrict: 'E',
            scope: { label: '@', post: '=', posts: '=' },
            templateUrl: 'templates/newPost.html'
        };
    });
})(angular);
