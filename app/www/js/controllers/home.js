angular.module('app.controllers.home', [])

.controller('HomeCtrl', function($scope, $rootScope, $location, $ionicLoading, $cordovaToast, MY_SERVER, $ionicPopup, $ionicModal, Login, Signup, Settings, $ionicPlatform, $cordovaCamera, $http) {
  $scope.user = Login.user;
  $scope.connection = Login.connection;
  var show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };

  var hide = function(){
    $ionicLoading.hide();
  };

  $scope.check_connection = function() {
    var message = "Connesso";
    show('Connessione...');
    Settings.hello(MY_SERVER.url, MY_SERVER.port)
    .then(function(response) {
      $scope.connection.state = true;
    },function(response) {
      $scope.connection.state = false;
      message = "Impossibile connettersi";
    }).finally(function() {
      hide();
      $cordovaToast.showShortBottom(message);
    });
  }

  $scope.getServers = function() {
    var count = 0;
    $scope.servers = [];
    for(var i = 1; i < 255; i++) {
      Settings.hello("192.168.1." + i).then(function(resIp) {
        $scope.servers.push({ip: resIp});
        $scope.$apply();
      }, function(resIp) {
        console.log("IP " + resIp);
      })
      .finally(function() {
        count++;
      });
    }
  }
  //End

  $scope.$on('$ionicView.enter',function(){
    $scope.check_connection();
  });

})
