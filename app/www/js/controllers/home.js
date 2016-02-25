
angular.module('app.controllers.home', [])


//.controller('HomeCtrl', function($scope, $http, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup) {
.controller('HomeCtrl', function($scope, $ionicPopup, $http) {

    $scope.utente = {};

    $scope.logout = function() {
      $http.defaults.headers.common.Authorization = "";
      window.localStorage.clear();
      $scope.utente.bloccato = false;
      $scope.utente.nome = "";
    }

    $scope.$on('$ionicView.enter',function(){
      $scope.utente.nome = window.localStorage['utente'] || "";
      $scope.utente.bloccato = window.localStorage['bloccato'] || false;
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
    });

})
