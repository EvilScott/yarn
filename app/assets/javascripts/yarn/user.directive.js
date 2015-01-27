(function(angular) {
    'use strict';

    angular.module('yarn').directive('user', function($http, $cookies, userState) {
        return {
            link: function(scope) {
                scope.$watch(function() { return $cookies.token }, function() {
                    scope.loggedIn = userState.loggedIn = !!($cookies.username && $cookies.token);
                    scope.message = 'Welcome ' + $cookies.username;
                });

                scope.logout = function() {
                    $http.post('/user/logout').success(function() {
                        scope.loggedIn = false;
                        delete $cookies.username;
                        delete $cookies.token;
                    });
                }
            },
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'templates/user.html'
        };
    });
})(angular);
