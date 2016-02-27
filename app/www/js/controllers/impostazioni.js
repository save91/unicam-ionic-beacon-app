angular.module('app.controllers.impostazioni', [])

.controller('ImpostazioniCtrl', function($scope, MY_SERVER, Impostazioni) {
  $scope.impostazioni = {};
  $scope.$on('$ionicView.enter',function(){
    $scope.impostazioni.url = MY_SERVER.url;
    $scope.impostazioni.port = MY_SERVER.port;
  });
  $scope.salva = function() {
    MY_SERVER.url = $scope.impostazioni.url;
    MY_SERVER.port = $scope.impostazioni.port;
  };
})
