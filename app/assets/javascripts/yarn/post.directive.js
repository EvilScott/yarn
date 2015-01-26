(function(angular) {
    'use strict';

    angular.module('yarn').directive('post', function($compile) {
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
})(angular);
