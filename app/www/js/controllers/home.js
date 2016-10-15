angular.module('app.controllers.home', [])

.controller('HomeCtrl', function($scope, $cordovaToast, $ionicLoading, $location, $ionicLoading, $cordovaToast, MY_SERVER, $ionicPopup, $ionicModal, Login, Signup, Settings, $ionicPlatform, $cordovaCamera, $http, mySocket) {
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

  $scope.check = function() {
    show('Verifica...');
    Login.getUser($scope.user.username).then(
      function() {
        $cordovaToast.showShortBottom("Account attivato");
      },function() {
        $cordovaToast.showShortBottom("Account non attivo");
      }
    ).finally(function() {
      hide();
    });
  };

  if($scope.connection.state) {
    $scope.$on('$ionicView.enter',function(){
      $scope.check_connection();
    });

    mySocket.on('update:user', function() {
      Login.getUser($scope.user.username);
    });
  }
})
