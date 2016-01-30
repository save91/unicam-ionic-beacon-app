angular.module('app.controllers.beacons', [])

.controller('BeaconsCtrl', function($scope, Beacons) {
  $scope.beacons = [];
  $scope.stato = {};
    $scope.$on('$ionicView.enter',function(){
      $scope.beacons = Beacons.all();
      $scope.stato = Beacons.stato();
    });

    $scope.aggiorna = function() {
        $scope.beacons = Beacons.aggiorna();
    }

})
