
angular.module('app.controllers.home', [])


//.controller('HomeCtrl', function($scope, $http, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup) {
.controller('HomeCtrl', function($scope, $ionicPopup) {
    $scope.verifica = function() {
      $ionicPopup.alert({
        title: "Verifica",
        template: "verifica"
      });
    }
})
