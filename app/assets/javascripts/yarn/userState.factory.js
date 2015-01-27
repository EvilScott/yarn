(function(angular) {
    'use strict';

    angular.module('yarn').factory('userState', function() {
        return {
            loggedIn: false
        };
    });
})(angular);
