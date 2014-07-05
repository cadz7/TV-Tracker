angular.module('MyApp')
  .controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', '$alert', 'Show', 'Subscription',
    function($scope, $rootScope, $routeParams, $alert, Show, Subscription) {
      Show.get({ _id: $routeParams.id }, function(show) {
        console.log(show);
        $scope.show = show;

        $scope.isSubscribed = function() {
          return $scope.show.subscribers.indexOf($rootScope.currentUser._id) !== -1;
        };

        $scope.subscribe = function() {
          Subscription.subscribe(show).success(function() {
            $scope.show.subscribers.push($rootScope.currentUser._id);
          });
        };

        $scope.unsubscribe = function() {
          Subscription.unsubscribe(show).success(function() {
            var index = $scope.show.subscribers.indexOf($rootScope.currentUser._id);
            $scope.show.subscribers.splice(index, 1);
          });
        };

        $scope.deleteShow = function() {
          var deletedShowName = $scope.show.name;
          show.$delete({ _id: $routeParams.id }, function() {
            console.log('show removed called');
            $alert({
              content: 'The show: ' + deletedShowName + ' has been removed.',
              placement: 'top-right',
              type: 'success',
              duration: 60
            });
          });
        }

        $scope.nextEpisode = show.episodes.filter(function(episode) {
          return new Date(episode.firstAired) > new Date();
        })[0];
      });
      

    }]);