angular.module('app.controllers.settings', [])

.controller('SettingsCtrl', function($scope, $location, $ionicPopup, MY_SERVER, Settings) {
  $scope.settings = {};
  $scope.servers = [];
  $scope.$on('$ionicView.enter',function(){
    $scope.settings.url = MY_SERVER.url;
    $scope.settings.port = MY_SERVER.port;
  });
  $scope.save = function() {
    MY_SERVER.url = $scope.settings.url;
    MY_SERVER.port = $scope.settings.port;
    window.localStorage['server'] = $scope.settings.url + ':' + $scope.settings.port
  };
  $scope.search = function() {
    var count = 0;
    $scope.servers = [];
    for(var i = 105; i < 115; i++) {
      Settings.hello("192.168.1." + i, "8000").then(function(res) {
        $scope.servers.push({
          ip: res.data.ip,
          port: res.data.port,
          name: res.data.name,
          version: res.data.version
        });
      }, function(res) {
        console.log("error");
      })
      .finally(function() {
        count++;
      });
    }
  };
  $scope.connect = function(server) {
    $scope.settings.url = server.ip;
    $scope.settings.port = server.port;
    $scope.save();
  };
})
