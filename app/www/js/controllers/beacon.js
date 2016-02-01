angular.module('app.controllers.beacon', [])

.controller('BeaconCtrl', function($scope, $ionicPopup, beacon) {
    $scope.data = {
        bloccato: false,
    };
    $scope.beacon = beacon;
    $scope.apri = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Apriporta',
            template: 'Hai aperto la porta!!'
        })
    };
})
