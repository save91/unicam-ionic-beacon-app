angular.module('app.controllers.settings', [])

.controller('SettingsCtrl', function($scope, $cordovaToast, $location, $ionicPopup, $ionicLoading, MY_SERVER, Settings, Login, mySocket) {
  $scope.settings = {};
  $scope.servers = [];
  $scope.searching = false;
  $scope.connection = Login.connection;
  $scope.$on('$ionicView.enter',function(){
    $scope.settings.url = MY_SERVER.url;
    $scope.settings.port = MY_SERVER.port;
  });
  var show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };
  var hide = function(){
    $ionicLoading.hide();
  };

  var check_connection = function() {
    var message = "Connesso";
    $scope.connection.state = false;
    Settings.hello(MY_SERVER.url, MY_SERVER.port)
    .then(function(response) {
      $scope.connection.state = true;
    },function(response) {
      $scope.connection.state = false;
      message = "Impossibile connettersi";
    }).finally(function() {
      $cordovaToast.showShortBottom(message);
    });
  };

  $scope.save = function() {
    MY_SERVER.url = $scope.settings.url;
    MY_SERVER.port = $scope.settings.port;
    window.localStorage['server'] = $scope.settings.url + ':' + $scope.settings.port;
    check_connection();
  };

  $scope.search = function() {
    var scan = {
      count: 0,
      init: 1,
      max: 254,
      servers: 0
    };
    networkinterface.getIPAddress(function (readIp) {
      var ip = readIp.split('.');
      debugger;
      $scope.servers = [];
      $scope.searching = true;
      for(var i = scan.init; i < scan.max; i++) {
        var app = i;
        Settings.hello(ip[0] + '.' + ip[1] + '.' + ip[2] + '.' + i, "8000").then(function(res) {
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
            $scope.searching = false;
            var message = "Nessun server trovato";
            if(scan.servers === 1) {
              message = "Trovato un server";
            } else if(scan.servers > 1){
              message = "Trovati " + scan.servers + " server";
            }
            $cordovaToast.showShortBottom(message);
          }
        });
      }
    },function(err) {
      $ionicPopup.alert({
        title: 'Errore',
        template: err
      });
    });
  };
  $scope.connect = function(server) {
    $scope.settings.url = server.ip;
    $scope.settings.port = server.port;
    $scope.save();
  };
})
