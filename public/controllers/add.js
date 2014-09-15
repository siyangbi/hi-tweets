angular.module('MyApp')
    .controller('AddCtrl', ['$scope', '$alert', 'Hashtag', function($scope, $alert, Hashtag) {
        $scope.addHashtag = function() {
            Hashtag.save({ name: $scope.hashtag },
                function() {
                    $scope.hashtag = '';
                    $scope.addForm.$setPristine();
                    $alert({
                        content: 'Hashtag has been added.',
                        placement: 'top-right',
                        type: 'success',
                        duration: 3
                    });
                },
                function(response) {
                    $scope.hashtag = '';
                    $scope.addForm.$setPristine();
                    $alert({
                        content: response.data.message,
                        placement: 'top-right',
                        type: 'danger',
                        duration: 3
                    });
                });
        };
    }]);