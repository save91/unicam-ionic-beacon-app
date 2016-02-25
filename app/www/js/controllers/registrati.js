angular.module('app.controllers.registrati', [])

.controller('RegistratiCtrl', function($scope, $location, $ionicPlatform, $ionicPopup, $cordovaCamera, $http, Registrati) {
  $scope.utente = {
    image: {src: "img/account.jpg"},
    username: "",
    nome: "",
    cognome: "",
    password: "",
    conferma_password: ""
  };
  $scope.utente.image.src = "img/account.jpg";
  $ionicPlatform.ready(function() {
    var options = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      cameraDirection: Camera.Direction.FRONT,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
    $scope.nuovaImmagine = function() {
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.utente.image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
    };
  });

  var title = "Errore!";
  var template = "";
  var valido = false;

  var callback = function(data) {
    valido = !data.trovato;

  }

  var callbackRegistrazione = function(data) {
    if(data.status === "ok") {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.utente.username +':'+$scope.utente.password);
      window.localStorage['utente'] = $scope.utente.nome;
      window.localStorage['bloccato'] = true;
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
      $location.path('/');
    }
  }

  $scope.checkUsername = function() {
    Registrati.checkUsername($scope.utente.username).then(callback);
  }

  $scope.registrati = function () {
    if($scope.utente.username.trim() === "" || $scope.utente.nome.trim() === "" || $scope.utente.cognome.trim() === "" || $scope.utente.password.trim() === "") {
      template = "Compila tutti i campi";
      $ionicPopup.alert({
        title: title,
        template: template
      });
    }else if(valido === false) {
      template = "Username già utilizzato";
      $ionicPopup.alert({
        title: title,
        template: template
      });
    }else if ($scope.utente.password !== $scope.utente.conferma_password) {
      template = "Le password non coincidono";
      $ionicPopup.alert({
        title: title,
        template: template
      });
    } else {
      var conferma = $ionicPopup.confirm({
        title: 'Registrazione',
        template: 'Sei sicuro di voler continuare?'
      });
      conferma.then(function(res) {
        if(res) {
          Registrati.registrati($scope.utente).then(callbackRegistrazione);
        }
      });
    }
  };
})
