angular.module('app.controllers.home', [])

.controller('HomeCtrl', function($scope, $cordovaToast, $ionicLoading, $location, $ionicLoading, $cordovaToast, MY_SERVER, $ionicPopup, $ionicModal, Login, Signup, Settings, $ionicPlatform, $cordovaCamera, $http) {
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

  $scope.$on('$ionicView.enter',function(){
    $scope.check_connection();
  });
})
