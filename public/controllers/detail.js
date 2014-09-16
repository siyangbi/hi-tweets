angular.module('MyApp')
    .controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Hashtag',
        function($scope, $rootScope, $routeParams, Hashtag) {
            $scope.busy = false;
            $scope.after = '';
            $scope.tweets = [];

            $scope.nextPage = function() {
                if ($scope.busy) return;
                $scope.busy = true;

                Hashtag.get({ id: $routeParams.id, maxId: $scope.after }, function(hashtag) {
                    $scope.tweets = $scope.tweets.concat(hashtag.statuses);
                    $scope.after = hashtag.maxId;
                    $scope.busy = false;
                });
            };
        }]);