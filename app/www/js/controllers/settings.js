angular.module('app.controllers.settings', [])

.controller('SettingsCtrl', function($scope, $location, MY_SERVER, Settings) {
  $scope.settings = {};
  $scope.$on('$ionicView.enter',function(){
    $scope.settings.url = MY_SERVER.url;
    $scope.settings.port = MY_SERVER.port;
  });
  $scope.salva = function() {
    MY_SERVER.url = $scope.settings.url;
    MY_SERVER.port = $scope.settings.port;
    $location.path("#/");
  };
})
