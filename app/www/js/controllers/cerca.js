
angular.module('app.controllers.cerca', [])

.controller('CercaCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup, Beacons) {
  $scope.beacons = {};

  $ionicPlatform.ready(function() {
      $cordovaBeacon.requestWhenInUseAuthorization();
      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
          var uniqueBeaconKey;
          for(var i = 0; i < pluginResult.beacons.length; i++) {
            uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
            if(!$scope.beacons[uniqueBeaconKey]) {
              $scope.beacons[uniqueBeaconKey] = {};
            }
            $scope.beacons[uniqueBeaconKey].uuid = pluginResult.beacons[i].uuid;
            $scope.beacons[uniqueBeaconKey].major = pluginResult.beacons[i].major;
            $scope.beacons[uniqueBeaconKey].minor = pluginResult.beacons[i].minor;
            $scope.beacons[uniqueBeaconKey].proximity = pluginResult.beacons[i].proximity;
            $scope.beacons[uniqueBeaconKey].accuracy = pluginResult.beacons[i].accuracy;
          }
          $scope.$apply();
      });
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("BlueUp", "ACFD065E-C3C0-11E3-9BBE-1A514932AC01"));
  });

  $scope.$on('$ionicView.enter',function(){
    Beacons.all().then(callbackBeacon);
  });
  var callbackBeacon = function(data) {
    var uniqueBeaconKey;
    for(var i = 0; i < data.length; i++) {
      uniqueBeaconKey = data[i].uuid + ":" + data[i].major + ":" + data[i].minor;
      if(!$scope.beacons[uniqueBeaconKey]) {
        $scope.beacons[uniqueBeaconKey] = {};
      }
      $scope.beacons[uniqueBeaconKey].uuid = data[i].uuid;
      $scope.beacons[uniqueBeaconKey].major = data[i].major;
      $scope.beacons[uniqueBeaconKey].minor = data[i].minor;
      $scope.beacons[uniqueBeaconKey].stato = data[i].stato;
    }
  };

  $scope.aggiungi = function(uuid, major, minor) {
    Beacons.aggiungi(uuid, major, minor).then(callbackBeacon);
  }
})
