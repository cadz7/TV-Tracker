angular.module('MyApp')
  .controller('AddCtrl', ['$scope', '$alert', 'Show', function($scope, $alert, Show) {
    $scope.addShow = function() {
      var showName = $scope.showName;
      console.log(showName);
      $alert({
        content: 'Searching for ' + showName + '...',
        placement: 'top-right',
        type: 'success',
        duration: 3
      });

      Show.save({showName: $scope.showName})
        .$promise.then(function() {
          $scope.showName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: showName + ' has been added.',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
          console.log('show added: ' + $scope.showName);

        }, function(response) {
            $scope.showName = '';
            $scope.addForm.$setPristine();
            $alert({
              content: response.data.message,
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
        });
    };
    $scope.shows = Show.query();
  }]);