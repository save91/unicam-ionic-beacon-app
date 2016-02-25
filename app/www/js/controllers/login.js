
angular.module('app.controllers.login', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $http, $location, Login) {

  $scope.bloccato = false;
  $scope.utente = {
    username: "",
    psw: ""
  };

  var callback = function(risposta) {
    $scope.bloccato = false;
    console.log(risposta);
    if(risposta.status === 200) {
        window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.utente.username +':'+$scope.utente.psw);
        window.localStorage['utente'] = risposta.utente.nome;
        window.localStorage['bloccato'] = risposta.utente.bloccato;
        $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
        $location.path('/');
    } else {
      $ionicPopup.alert({
        title: "Errore",
        template: "Controllare le credenziali"
      });
    }
  };

  $scope.login = function() {
    $scope.bloccato = true;
    Login.login($scope.utente.username, $scope.utente.psw).then(callback);
  };
})
