(function(angular) {
    'use strict';

    angular.module('yarn').directive('post', function($compile, $http, userState) {
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

                        scope.$watch(function() { return userState.loggedIn; }, function() {
                            scope.loggedIn = userState.loggedIn;
                        });

                        scope.getMore = function(nextPageUrl) {
                            $http.get(nextPageUrl).success(function(data) {
                                scope.post.posts.push.apply(scope.post.posts, data.posts);
                                scope.post.nextPage = data.nextPage;
                            });
                        };

                        scope.getDeeper = function(deeperUrl) {
                            $http.get(deeperUrl).success(function(data) {
                                scope.post.posts = data.posts;
                                scope.post.deeper = null;
                            });
                        };
                    }
                };
            },
            replace: true,
            restrict: 'E',
            scope: { post: '=' },
            templateUrl: 'templates/post.html'
        };
    });
})(angular);
