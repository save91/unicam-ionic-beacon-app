angular.module('app.controllers.settings', [])

.controller('SettingsCtrl', function($scope, $cordovaToast, $location, $ionicPopup, $ionicLoading, MY_SERVER, Settings) {
  $scope.settings = {};
  $scope.servers = [];
  $scope.$on('$ionicView.enter',function(){
    $scope.settings.url = MY_SERVER.url;
    $scope.settings.port = MY_SERVER.port;
  });
  var show = function() {
    $ionicLoading.show({
      template: 'Ricerca in corso...'
    });
  };
  var hide = function(){
    $ionicLoading.hide();
  };
  $scope.save = function() {
    MY_SERVER.url = $scope.settings.url;
    MY_SERVER.port = $scope.settings.port;
    window.localStorage['server'] = $scope.settings.url + ':' + $scope.settings.port
  };
  $scope.search = function() {
    var scan = {
      count: 0,
      init: 100,
      max: 120,
      servers: 0
    };
    //TODO: Leggere subnet mask e IP e agir
    /*Start ip
    $scope.ip = "";
    $scope.getIp = function() {
      networkinterface.getIPAddress(function (readIp) {
        $scope.ip = readIp;
        $scope.$apply();
      });
    }
    */
    $scope.servers = [];
    show(scan.count);
    for(var i = scan.init; i < scan.max; i++) {
      var app = i;
      Settings.hello("192.168.1." + i, "8000").then(function(res) {
        $scope.servers.push({
          ip: res.ip,
          port: res.port,
          name: res.name,
          version: res.version
        });
        scan.servers++;
      }, function(res) {
        console.log(res);
      })
      .finally(function() {
        scan.count++;
        if(scan.count >= (scan.max - scan.init)) {
          hide();
          var message = "Nessun server trovato";
          if(scan.servers === 1) {
            message = "Trovato un server";
          } else if(scan.servers > 1){
            message = "Trovati " + scan.servers + "server";
          }
          $cordovaToast.showShortBottom(message);
        }
      });
    }
  };
  $scope.connect = function(server) {
    $scope.settings.url = server.ip;
    $scope.settings.port = server.port;
    $scope.save();
  };
})
