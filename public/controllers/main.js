angular.module('MyApp')
    .controller('MainCtrl', ['$scope', 'Hashtag', function($scope, Hashtag) {

        $scope.headingTitle = 'My Hashtags';

        $scope.hashtags = Hashtag.query();

    }]);