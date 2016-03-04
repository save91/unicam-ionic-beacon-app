angular.module('app.controllers.devices', [])

.controller('DevicesCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, Devices) {
  $scope.devices = [];
  $scope.beacons = [];
  $ionicPlatform.ready(function() {
    $cordovaBeacon.requestWhenInUseAuthorization();
    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult, Devices) {
      var uniqueBeaconKey;
      for(var i = 0; i < pluginResult.beacons.length; i++) {
        uniqueBeaconKey = pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
        for(var j = 0; j < $scope.devices.length; j++) {
          if(uniqueBeaconKey === $scope.devices[j].major + ":" + $scope.devices[j].minor) {
            $scope.devices[j].proximity = pluginResult.beacons[i].proximity;
            $scope.devices[j].accuracy = pluginResult.beacons[i].accuracy;
            if($scope.devices[j].proximity === "ProximityImmediate") {
              $scope.devices[j].disable = false;
              if($scope.devices[j].automatic) {
                $scope.on($scope.devices[j]);
              }
            } else {
              $scope.devices[j].disabilitato = true;
              if($scope.devices[j].automatic) {
                $scope.off($scope.devices[j]);
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
    Devices.all().then(callback);
  });

  var callback = function(data) {
    $scope.devices = data;
  };

  $scope.aggiorna = function() {
    Devices.all().then(callback);
  };

  $scope.on = function(device) {
    if(device.state !== 1) {
      Devices.setGPIO(device.id_GPIO, 1);
      device.state = 1;
    }
  }

  $scope.off = function(device) {
    if(device.state !== 0) {
      Devices.setGPIO(device.id_GPIO, 0);
      device.state = 0;
    }
  }

  $scope.change_state = function(device) {
    if(device.state) {
      Devices.setGPIO(device.id_GPIO, 1);
    } else {
      Devices.setGPIO(device.id_GPIO, 0);
    }
  }
});
