angular.module('app.services.ibeacons',[])

.factory('Beacons', function($http, $cordovaBeacon, $ionicPlatform, MY_SERVER, $rootScope) {
  var Beacon = {
    region: {
      name: "",
      identifier: "BlueUp",
      uuid: "ACFD065E-C3C0-11E3-9BBE-1A514932AC01",
      major: "0",
      minor: "0",
      notifyEntryStateOnDisplay: false
    },
    add: function(uuid, major, minor) {
      return $http.post(MY_SERVER.get() + '/api/v2.0/beacon',{
        uuid: uuid,
        major: major,
        minor: minor
      });
    },
    all: function() {
      return $http.get(MY_SERVER.get() + '/api/v2.0/beacon')
    },
    regions: [{
      name: "e-xtrategy",
      identifier: "BlueUp",
      uuid: "ACFD065E-C3C0-11E3-9BBE-1A514932AC01",
      notifyEntryStateOnDisplay: false
    }]
  };
  $ionicPlatform.ready(function() {
    var createBeaconRegion = function(number) {
      return $cordovaBeacon.createBeaconRegion(Beacon.regions[number].identifier, Beacon.regions[number].uuid, Beacon.regions[number].major, Beacon.regions[number].minor, Beacon.regions[number].notifyEntryStateOnDisplay);
    };
    Beacon.isBluetoothEnabled = function() {
      return $cordovaBeacon.isBluetoothEnabled();
    };
    Beacon.enableBluetooth = function() {
      return $cordovaBeacon.enableBluetooth();
    };
    Beacon.disableBluetooth = function() {
      return $cordovaBeacon.disableBluetooth();
    };
    Beacon.startMonitoringForRegion = function(number) {
      return $cordovaBeacon.startMonitoringForRegion(createBeaconRegion(number));
    };
    Beacon.stopMonitoringForRegion = function(number) {
      return $cordovaBeacon.stopMonitoringForRegion(createBeaconRegion(number));
    };
    Beacon.requestStateForRegion = function(number) {
      return $cordovaBeacon.requestStateForRegion(createBeaconRegion(number));
    };
    Beacon.getMonitoredRegions = function() {
      return $cordovaBeacon.getMonitoredRegions();
    };
    Beacon.isMonitoringAvailableForClass = function(number) {
      return $cordovaBeacon.isMonitoringAvailableForClass(createBeaconRegion(number));
    };
    Beacon.startRangingBeaconsInRegion = function(number) {
      return $cordovaBeacon.startRangingBeaconsInRegion(createBeaconRegion(number));
    };
    Beacon.stopRangingBeaconsInRegion = function(number) {
      return $cordovaBeacon.stopRangingBeaconsInRegion(createBeaconRegion(number));
    };
    Beacon.getRangedRegions = function() {
      return $cordovaBeacon.getRangedRegions();
    };
    Beacon.isRangingAvailable = function() {
      return $cordovaBeacon.isRangingAvailable();
    };
    Beacon.getAuthorizationStatus = function() {
      return $cordovaBeacon.getAuthorizationStatus();
    };
    Beacon.requestWhenInUseAuthorization = function() {
      return $cordovaBeacon.requestWhenInUseAuthorization();
    };
    Beacon.requestAlwaysAuthorization = function() {
      return $cordovaBeacon.requestAlwaysAuthorization();
    };
    Beacon.startAdvertising = function(number, measuredPower) {
      return $cordovaBeacon.startAdvertising(createBeaconRegion(number), measuredPower);
    };
    Beacon.stopAdvertising = function() {
      return $cordovaBeacon.stopAdvertising();
    };
    Beacon.isAdvertising = function() {
      return $cordovaBeacon.isAdvertising();
    };
    //Events
    //Monitorings
    Beacon.setCallbackDidDetermineStateForRegion = function(callback) {
      $cordovaBeacon.setCallbackDidDetermineStateForRegion(callback);
    };
    $rootScope.$on("$cordovaBeacon:didDetermineStateForRegion\n", function(event, pluginResult) {
      console.log("didDetermineStateForRegion\n" + JSON.stringify(pluginResult));
    });
    Beacon.setCallbackDidStartMonitoringForRegion = function(callback) {
      $cordovaBeacon.setCallbackDidStartMonitoringForRegion(callback);
    };
    $rootScope.$on("$cordovaBeacon:didStartMonitoringForRegion", function(event, pluginResult) {
      console.log("didStartMonitoringForRegion\n" + JSON.stringify(pluginResult));
    });
    Beacon.setCallbackDidEnterRegion = function(callback) {
      $cordovaBeacon.setCallbackDidEnterRegion(callback);
    };
    $rootScope.$on("$cordovaBeacon:didEnterRegion", function(event, pluginResult) {
      console.log("didEnterRegion\n" + JSON.stringify(pluginResult));
    });
    Beacon.setCallbackDidExitRegion = function(callback) {
      $cordovaBeacon.setCallbackDidExitRegion(callback);
    };
    $rootScope.$on("$cordovaBeacon:didExitRegion", function(event, pluginResult) {
      console.log("didExitRegion\n" + JSON.stringify(pluginResult));
    });
    //Rangings
    Beacon.setCallbackDidRangeBeaconsInRegion = function(callback) {
      $cordovaBeacon.setCallbackDidRangeBeaconsInRegion(callback);
    };
    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
      console.log("didRangeBeaconsInRegion\n" + JSON.stringify(pluginResult));
    });
    //Advertisings
    Beacon.setCallbackPeripheralManagerDidStartAdvertising = function(callback) {
      $cordovaBeacon.setCallbackPeripheralManagerDidStartAdvertising(callback);
    };
    $rootScope.$on("$cordovaBeacon:peripheralManagerDidStartAdvertising", function(event, pluginResult) {
      console.log("peripheralManagerDidStartAdvertising\n" + JSON.stringify(pluginResult));
    });
    Beacon.setCallbackPeripheralManagerDidUpdateState = function(callback) {
      $cordovaBeacon.setCallbackPeripheralManagerDidUpdateState(callback);
    };
    $rootScope.$on("$cordovaBeacon:peripheralManagerDidUpdateState", function(event, pluginResult) {
      console.log("peripheralManagerDidUpdateState\n" + JSON.stringify(pluginResult));
    });
    //Bluetooth and authorization
    Beacon.setCallbackDidChangeAuthorizationStatus = function(callback) {
      $cordovaBeacon.setCallbackDidChangeAuthorizationStatus(callback);
    };
    $rootScope.$on("$cordovaBeacon:didChangeAuthorizationStatus", function(event, pluginResult) {
      console.log("didChangeAuthorizationStatus\n" + JSON.stringify(pluginResult));
    });
  });
  return Beacon;
});
