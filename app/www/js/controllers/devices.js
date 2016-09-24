angular.module('app.controllers.devices', [])

.controller('DevicesCtrl', function($scope, $rootScope, $ionicPopup, $ionicPlatform, $cordovaBeacon, Beacons, Devices, $state, $ionicHistory, mySocket) {
  $scope.devices = [];
  $scope.beacons = [];



  $scope.$on('$ionicView.enter',function(){
    updateDevice();
    console.log("Enter");
    $ionicPlatform.ready(function() {
    Beacons.startRangingBeaconsInRegion(0);


    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult, Devices) {
      var uniqueBeaconKey;
      for(var i = 0; i < pluginResult.beacons.length; i++) {
        uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
        for(var j = 0; j < $scope.devices.length; j++) {
          if($scope.devices[j]._Beacon) {
            if(uniqueBeaconKey === $scope.devices[j]._Beacon.properties.uuid + ":" + $scope.devices[j]._Beacon.properties.major + ":" + $scope.devices[j]._Beacon.properties.minor) {
              $scope.devices[j]._Beacon.properties.proximity = pluginResult.beacons[i].proximity;
              $scope.devices[j]._Beacon.properties.accuracy = pluginResult.beacons[i].accuracy;
              if($scope.devices[j]._Beacon.properties.proximity === "ProximityImmediate") {
                $scope.devices[j].disable = false;
                if($scope.devices[j].automatic) {
                  on($scope.devices[j]);
                }
              } else {
                $scope.devices[j].disable = true;
                if($scope.devices[j].automatic) {
                  off($scope.devices[j]);
                }
              }
            }
          }
        }
      }
      $scope.$apply();
    });
  });
  });

  var updateDevice = function() {
    Devices.all().then(function(response) {
      $scope.devices = response.data;
      for(var i = 0; i<$scope.devices.length; i++) {
        if($scope.devices[i]._Beacon) {
          $scope.devices[i].disable = true;
        } else {
          $scope.devices[i].disable = false;
        }
      }
    }, function(response) {
      $ionicPopup.alert({
        title: 'Attenzione',
        template: "Il tuo account è stato bloccato"
      });
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.home");
    });
  };

  $scope.update = function() {
    updateDevice();
  };

  var on = function(device) {
    Devices.action(device._id, "on");
  };

  var off = function(device) {
    Devices.action(device._id, "off");
  };

  $scope.change_state = function(device) {
    if(device._GPIO.value) {
      on(device);
    } else {
      off(device);
    }
  };

  $scope.open = function(device) {
    Devices.action(device._id, "on");
  };

  $scope.push = function(device) {
    Devices.action(device._id, "push");
  };

  $scope.close = function(device) {
    Devices.action(device._id, "off");
  };

  mySocket.on('update:device', function() {
    updateDevice();
  });

  mySocket.on('update:user', function() {
    updateDevice();
  });

});
