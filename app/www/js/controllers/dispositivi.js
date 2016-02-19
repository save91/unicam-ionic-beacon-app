angular.module('app.controllers.dispositivi', [])

.controller('DispositiviCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, Dispositivi) {
    $scope.dispositivi = [];
    $scope.beacons = [];

    $ionicPlatform.ready(function() {
       $cordovaBeacon.requestWhenInUseAuthorization();
       $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult, Dispositivi) {
           var uniqueBeaconKey;
           for(var i = 0; i < pluginResult.beacons.length; i++) {
               uniqueBeaconKey = pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
               for(var j = 0; j < $scope.dispositivi.length; j++) {
                  if(uniqueBeaconKey === $scope.dispositivi[j].major + ":" + $scope.dispositivi[j].minor) {
                    $scope.dispositivi[j].proximity = pluginResult.beacons[i].proximity;
                    $scope.dispositivi[j].distanza = pluginResult.beacons[i].accuracy;
                    if($scope.dispositivi[j].proximity === "ProximityImmediate") {
                      $scope.dispositivi[j].disabilitato = false;
                      if($scope.dispositivi[j].automatico) {
                        $scope.accendi($scope.dispositivi[j]);
                      }
                    }else{
                      $scope.dispositivi[j].disabilitato = true;
                      if($scope.dispositivi[j].automatico) {
                        $scope.spegni($scope.dispositivi[j]);
                      }
                    }
                  }
                }
            }
          $scope.$apply();
       });
       $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("BlueUp", "ACFD065E-C3C0-11E3-9BBE-1A514932AC01"));
    });

    $scope.$on('$ionicView.enter',function(){
      Dispositivi.all().then(callback);
    });
    var callback = function(data) {
      $scope.dispositivi = data;
    };


    $scope.aggiorna = function() {
        Dispositivi.all().then(callback);
    };

    $scope.accendi = function(dispositivo) {
      if(dispositivo.stato !== 1) {
        console.log("Accendi " + dispositivo.nome);
        Dispositivi.setGPIO(dispositivo.id_GPIO, 1);
        dispositivo.stato = 1;
      }
    }

    $scope.spegni = function(dispositivo) {
      if(dispositivo.stato !== 0) {
        console.log("Spegni " + dispositivo.nome);
        Dispositivi.setGPIO(dispositivo.id_GPIO, 0);
        dispositivo.stato = 0;
      }
    }

    $scope.cambia_stato = function(dispositivo) {
      if(dispositivo.stato) {
        console.log("Accendi " + dispositivo.nome);
        Dispositivi.setGPIO(dispositivo.id_GPIO, 1);
      } else {
        console.log("Spegni " + dispositivo.nome);
        Dispositivi.setGPIO(dispositivo.id_GPIO, 0);
      }
    }
});
