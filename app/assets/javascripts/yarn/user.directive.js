(function(angular) {
    'use strict';

    angular.module('yarn').directive('user', function($http, $cookies, userState) {
        return {
            link: function(scope) {
                var userAuth = function(url) {
                    scope.errors = [];
                    $http.post(url, scope.user)
                        .success(function(resp) {
                            if (resp.success) {
                                scope.show = null;
                                $cookies.username = resp.user.name;
                                $cookies.token = resp.user.token;
                            } else {
                                scope.errors = [ resp.error ];
                            }
                        }).error(function() {
                            scope.errors = [ 'Something went wrong; try again later' ];
                        });
                };

                scope.$watch(function() { return $cookies.username && $cookies.token }, function() {
                    scope.loggedIn = userState.loggedIn = !!($cookies.username && $cookies.token);
                    scope.message = 'Welcome ' + $cookies.username;
                });

                scope.login = function() {
                    userAuth('/user/login');
                };

                scope.register = function() {
                    userAuth('/user/register');
                };

                scope.logout = function() {
                    $http.post('/user/logout').success(function() {
                        delete $cookies.username;
                        delete $cookies.token;
                    });
                };
            },
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'templates/user.html'
        };
    });
})(angular);
