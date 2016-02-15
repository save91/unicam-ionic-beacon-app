angular.module('app.controllers.dispositivi', [])

.controller('DispositiviCtrl', function($scope, Dispositivi) {
  $scope.dispositivi = [];
  $scope.stato = {};
    $scope.$on('$ionicView.enter',function(){
      Dispositivi.all().then(callback);
      $scope.stato = Dispositivi.stato();
    });
    var callback = function(data) {
      $scope.dispositivi = data;
    }

    $scope.aggiorna = function() {
        Dispositivi.all().then(callback);
    }

    $scope.accendi = function(dispositivo) {
      if(dispositivo.stato) {
        console.log("Accendi " + dispositivo.nome);
        Dispositivi.setGPIO(dispositivo.id_GPIO, 1);
      } else {
        console.log("Spegni " + dispositivo.nome);
        Dispositivi.setGPIO(dispositivo.id_GPIO, 0);
      }
    }

})
