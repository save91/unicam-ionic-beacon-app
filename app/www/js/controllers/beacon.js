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

/*
.controller('HomeCtrl', function($scope, $http, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup) {
//controller('HomeCtrl', function($scope) {
    $scope.beacons = {};
    $scope.data = {
        bloccato: true
    }; 

    $ionicPlatform.ready(function() {
 
        $cordovaBeacon.requestWhenInUseAuthorization();
        $scope.beacon = {};
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            console.log("Trovati nuovi Beacons: " + pluginResult.beacons.length);
            
            
            for(var i = 0; i < pluginResult.beacons.length; i++) {
                
                if(pluginResult.beacons[i].major === "0" && pluginResult.beacons[i].minor === "1") {               
                    console.log('beacon:');
                    console.log('uuid: ' + pluginResult.beacons[i].uuid);
                    console.log('major: ' + pluginResult.beacons[i].major);
                    console.log('minor: ' + pluginResult.beacons[i].minor);
                    console.log('accuracy: ' + pluginResult.beacons[i].accuracy);
                    console.log('proximity: ' + pluginResult.beacons[i].proximity);
                    console.log('rssi: ' + pluginResult.beacons[i].rssi);
                    console.log('tx: ' + pluginResult.beacons[i].tx);
                    console.log('------------------------------------');
                    $scope.beacon = pluginResult.beacons[i];
                    if(pluginResult.beacons[i].proximity === "ProximityImmediate" || pluginResult.beacons[i].proximity === "ProximityNear")
                        $scope.data.bloccato = false;
                    else
                        $scope.data.bloccato = true;
                    $scope.$apply();
                }
            }
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("BlueUp", "ACFD065E-C3C0-11E3-9BBE-1A514932AC01",0,0));

        
    });
    $scope.apri = function() {
        console.log("Hai aperto la porta!!!");
        $http({
            method: 'POST',
            url: 'http://192.168.1.148:8000/door',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': "Basic OkNpYW9NYW1tYQ=="
            },
            data: "test=esperimento"
        }).then(function(response) {
            var alertPopup = $ionicPopup.alert({
                title: 'PORTA APERTA!',
                template: 'hai aperto la porta! '
            });
        },function(response) {
            var alertPopup = $ionicPopup.alert({
                title: 'ERRORE!',
                template: 'Qualcosa è andato storto!'
            });
        });
    };

    $scope.cambiaStato = function(value) {
        $scope.data.bloccato = value;
    }
})
*/