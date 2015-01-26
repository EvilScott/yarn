(function(angular) {
    'use strict';

    angular.module('yarn').directive('newPost', function(Post) {
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
