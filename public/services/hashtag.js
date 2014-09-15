angular.module('MyApp')
    .factory('Hashtag', ['$resource', function($resource) {
        return $resource('/v1/hashtags/:id');
    }]);