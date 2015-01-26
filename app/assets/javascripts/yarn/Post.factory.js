(function(angular) {
    'use strict';

    angular.module('yarn').factory('Post', function($resource) {
        return $resource('/posts/:id');
    });
})(angular);
