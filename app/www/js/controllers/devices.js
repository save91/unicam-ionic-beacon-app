angular.module('app.controllers.devices', [])

.controller('DevicesCtrl', function($scope, $rootScope, $ionicPopup, $ionicPlatform, $cordovaBeacon, Beacons, Devices) {
  $scope.devices = [];
  $scope.beacons = [];

  $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult, Devices) {
    var uniqueBeaconKey;
    for(var i = 0; i < pluginResult.beacons.length; i++) {
      uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
      for(var j = 0; j < $scope.devices.length; j++) {
        if(uniqueBeaconKey === $scope.devices[j].uuid + ":" + $scope.devices[j].major + ":" + $scope.devices[j].minor) {
          $scope.devices[j].proximity = pluginResult.beacons[i].proximity;
          $scope.devices[j].accuracy = pluginResult.beacons[i].accuracy;
          if($scope.devices[j].proximity === "ProximityImmediate") {
            $scope.devices[j].disable = false;
            if($scope.devices[j].automatic) {
              $scope.on($scope.devices[j]);
            }
          } else {
            $scope.devices[j].disable = true;
            if($scope.devices[j].automatic) {
              $scope.off($scope.devices[j]);
            }
          }
        }
      }
    }
    $scope.$apply();
  });

  $scope.$on('$ionicView.enter',function(){
    updateDevice();
    console.log("Enter");
    $cordovaBeacon.getRangedRegions().then(
      function(res) {
        if(res.length === 0) {
          Beacons.startRangingBeaconsInRegion(0);
        }
      }
    );
  });

  var updateDevice = function() {
    Devices.all().then(function(response) {
      $scope.devices = response.data;
      for(var i = 0; i<$scope.devices.length; i++) {
        if($scope.devices[i].uuid === 0) {
          $scope.devices[i].disable = false;
        } else {
          $scope.devices[i].disable = true;
        }
      }
    }, function(response) {
      $ionicPopup.alert({
        title: 'Errore',
        template: response.data
      });
    });
  }

  $scope.update = function() {
    updateDevice();
  };

  var on = function(device) {
    Devices.action(device.id, "on");
  };

  var off = function(device) {
    Devices.action(device.id, "off");
  };

  $scope.change_state = function(device) {
    if(device.state) {
      on(device);
    } else {
      off(device);
    }
  };

  $scope.open = function(device) {
    console.log("open");
    Devices.action(device.id, "open");
  };
});
