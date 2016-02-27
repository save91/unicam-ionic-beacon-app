
angular.module('app.controllers.home', [])

.controller('HomeCtrl', function($scope, $ionicPopup, $ionicModal, Login, Registrati,$ionicPlatform, $cordovaCamera, $http) {
    $scope.utente = {};

    $scope.logout = function() {
      $http.defaults.headers.common.Authorization = "";
      window.localStorage['utente'] = '';
      window.localStorage['bloccato'] = '';
      window.localStorage['Authorization'] = '';
      $scope.utente.bloccato = false;
      $scope.utente.nome = "";
    }

    $scope.$on('$ionicView.enter',function(){
      $scope.utente.nome = window.localStorage['utente'] || "";
      $scope.utente.bloccato = window.localStorage['bloccato'] || false;
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
    });

    // Form data for the login modal
    $scope.loginData = {};

    // Form data for the login modal
    $scope.datiRegistrazione = {
      image: {src: "img/account.jpg"}
    };

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
          $scope.datiRegistrazione.image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });
      };
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalLogin = modal;
    });

    // Create the registration modal that we will use later
    $ionicModal.fromTemplateUrl('templates/registrati.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalRegistrati = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modalLogin.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modalLogin.show();
    };

    // Triggered in the login modal to close it
    $scope.closeRegistrati = function() {
      $scope.modalRegistrati.hide();
    };

    // Open the login modal
    $scope.registrati = function() {
      $scope.modalRegistrati.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      Login.login($scope.loginData.username, $scope.loginData.password).then(callbackLogin);
    };

    var callbackLogin = function(risposta) {
      $scope.bloccato = false;
      console.log(risposta);
      if(risposta.status === 200) {
        window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.loginData.username +':'+$scope.loginData.password);
        window.localStorage['utente'] = risposta.utente.nome;
        window.localStorage['bloccato'] = risposta.utente.bloccato;
        $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
        $scope.closeLogin();
      } else {
        $ionicPopup.alert({
          title: "Errore",
          template: "Controllare le credenziali"
        });
      }
    };

    var title = "Errore!";
    var template = "";
    var valido = false;

    var callback = function(data) {
      valido = !data.trovato;

    }

    var callbackRegistrazione = function(data) {
      if(data.status === "ok") {
        window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.datiRegistrazione.username +':'+$scope.datiRegistrazione.password);
        window.localStorage['utente'] = $scope.datiRegistrazione.nome;
        window.localStorage['bloccato'] = true;
        $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
        $scope.closeRegistrati();
      }
    }

    $scope.checkUsername = function() {
      Registrati.checkUsername($scope.datiRegistrazione.username).then(callback);
    }

    $scope.doRegistrati = function () {
      if($scope.datiRegistrazione.username.trim() === "" || $scope.datiRegistrazione.nome.trim() === "" || $scope.datiRegistrazione.cognome.trim() === "" || $scope.datiRegistrazione.password.trim() === "") {
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
      }else if ($scope.datiRegistrazione.password !== $scope.datiRegistrazione.conferma_password) {
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
            Registrati.registrati($scope.datiRegistrazione).then(callbackRegistrazione);
          }
        });
      }
    };
  })
