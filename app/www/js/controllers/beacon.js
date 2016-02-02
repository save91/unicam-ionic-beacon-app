angular.module('app.controllers.beacon', [])

.controller('BeaconCtrl', function($scope, $ionicPopup, beacon, Beacons) {
    $scope.data = {
        bloccato: false,
    };
    $scope.beacon = beacon;
    $scope.comando = function(azione) {
        Beacons.comando(azione.url)
        var alertPopup = $ionicPopup.alert({
            title: azione.nome,
            template: azione.url
        })
    };
})
