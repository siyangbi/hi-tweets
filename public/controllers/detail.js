angular.module('MyApp')
    .controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Hashtag',
        function($scope, $rootScope, $routeParams, Hashtag) {
            var maxId = $routeParams.maxId || null;
            Hashtag.get({ id: $routeParams.id, maxId: maxId }, function(hashtag) {
                $scope.hashtag = hashtag;
            });

            $scope.delete = function() {
                //@todo
                //console.log("here");
            };
        }]);