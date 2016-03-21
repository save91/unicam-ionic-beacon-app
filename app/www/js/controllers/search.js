
angular.module('app.controllers.search', [])

.controller('SearchCtrl', function($scope, $rootScope, $ionicPlatform, $ionicLoading, $ionicPopup, Beacons) {
  $scope.beacons = {};
  var show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };
  var hide = function(){
    $ionicLoading.hide();
  };
  $ionicPlatform.ready(function() {
    Beacons.setCallbackDidRangeBeaconsInRegion(function(pluginResult) {
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


    $scope.$on('$ionicView.enter',function(){
      getBeacons();
      console.log("Enter");
      Beacons.startRangingBeaconsInRegion(0);
    });

    $scope.$on('$stateChangeStart',function(){
      Beacons.stopRangingBeaconsInRegion(0);
    });

  });

  var updateBeacon = function(data) {
    var uniqueBeaconKey;
    $scope.beacons = {};
    for(var i = 0; i < data.length; i++) {
      uniqueBeaconKey = data[i].uuid + ":" + data[i].major + ":" + data[i].minor;
      if(!$scope.beacons[uniqueBeaconKey]) {
        $scope.beacons[uniqueBeaconKey] = {};
      }
      $scope.beacons[uniqueBeaconKey].uuid = data[i].uuid;
      $scope.beacons[uniqueBeaconKey].major = data[i].major;
      $scope.beacons[uniqueBeaconKey].minor = data[i].minor;
      $scope.beacons[uniqueBeaconKey].state = data[i].state;
    }
  };

  var getBeacons = function() {
    Beacons.all()
    .then(function(response) {
      updateBeacon(response.data);
    },function(response) {
      $scope.beacons = {};
    }).finally(function() {
      hide();
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.home");
    });
  }


  $scope.add = function(uuid, major, minor) {
    Beacons.add(uuid, major, minor)
    .then(function(response) {
      getBeacons();
    },function(response) {
      $scope.beacons = {};
    });
  }
})
