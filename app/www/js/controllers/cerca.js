
angular.module('app.controllers.cerca', [])

.controller('CercaCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup, Beacons) {
  $scope.beacons = {};

  $ionicPlatform.ready(function() {
      $cordovaBeacon.requestWhenInUseAuthorization();
      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
          var uniqueBeaconKey;
          for(var i = 0; i < pluginResult.beacons.length; i++) {
              uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
              $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
          }
          $scope.$apply();
      });
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("BlueUp", "ACFD065E-C3C0-11E3-9BBE-1A514932AC01"));
  });
  var callback = function(data) {
    $ionicPopup.alert({
      title: "CAricameneto",
      template: "completato"
    });
  }

  $scope.aggiungi = function(major, minor) {
    Beacons.aggiungi(major, minor).then(callback);
  }
})
