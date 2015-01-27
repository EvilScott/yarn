(function(angular) {
    'use strict';

    angular.module('yarn').directive('post', function($compile, userState) {
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
