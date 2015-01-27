(function(angular) {
    'use strict';

    angular.module('yarn').directive('login', function($http, $cookies) {
        return {
            link: function(scope) {
                scope.login = function() {
                    scope.error = '';
                    $http.post('/user/login', scope.user)
                        .success(function(resp) {
                            if (resp.success) {
                                $cookies.username = resp.user.name;
                                $cookies.token = resp.user.token;
                                scope.$parent.$parent.show = null;
                            } else {
                                scope.error = resp.error;
                            }
                        }).error(function() {
                            scope.error = 'Something went wrong; try again later';
                        });
                }
            },
            replace: true,
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/login.html'
        };
    });
})(angular);
