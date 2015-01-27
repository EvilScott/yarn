(function(angular) {
    'use strict';

    angular.module('yarn').directive('register', function($http, $cookies) {
        return {
            link: function(scope) {
                scope.register = function() {
                    scope.error = '';
                    $http.post('/user/register', scope.user)
                        .success(function(resp) {
                            if (resp.success) {
                                $cookies.username = resp.user.name;
                                $cookies.token = resp.user.token;
                                scope.$parent.$parent.show = null;
                            } else {
                                scope.errors = resp.errors;
                            }
                        }).error(function() {
                            scope.error = 'Something went wrong; try again later';
                        });
                }
            },
            replace: true,
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/register.html'
        };
    });
})(angular);
