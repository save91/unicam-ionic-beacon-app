angular.module('app.controllers.home', [])

.controller('HomeCtrl', function($scope, $ionicPopup, $ionicModal, Login, Signup, $ionicPlatform, $cordovaCamera, $http) {
  $scope.utente = {};

  $scope.logout = function() {
    $http.defaults.headers.common.Authorization = "";
    window.localStorage['user'] = '';
    window.localStorage['block'] = '';
    window.localStorage['Authorization'] = '';
    $scope.utente.block = false;
    $scope.utente.name = "";
  }

  $scope.$on('$ionicView.enter',function(){
    $scope.utente.name = window.localStorage['user'] || "";
    $scope.utente.block = window.localStorage['block'] || false;
    $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
  });

  // Form data for the login modal
  $scope.loginData = {};

  // Form data for the login modal
  $scope.signupData = {
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
    $scope.newImage = function() {
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.signupData.image.src = "data:image/jpeg;base64," + imageData;
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

  // Create the signupon modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSignup = modal;
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
  $scope.closeSignup = function() {
    $scope.modalSignup.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modalSignup.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    Login.login($scope.loginData.username, $scope.loginData.password).then(callbackLogin);
  };

  var callbackLogin = function(response) {
    $scope.block = false;
    console.log(response);
    if(risposta.status === 200) {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.loginData.username +':'+$scope.loginData.password);
      window.localStorage['user'] = risposta.user.name;
      window.localStorage['block'] = risposta.user.block;
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
  var ok = false;

  var callback = function(data) {
    ok = !data.found;
  }

  var callbackSignup = function(data) {
    if(data.status === "ok") {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.datiSignup.username +':'+$scope.datiSignup.password);
      window.localStorage['user'] = $scope.signupData.nome;
      window.localStorage['block'] = true;
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
      $scope.closeSignup();
    }
  }

  $scope.checkUsername = function() {
    Signup.checkUsername($scope.signupData.username).then(callback);
  }

  $scope.doSignup = function () {
    if($scope.signupData.username.trim() === "" || $scope.signupData.nome.trim() === "" || $scope.signupData.cognome.trim() === "" || $scope.signupData.password.trim() === "") {
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
    }else if ($scope.signupData.password !== $scope.signupData.conferma_password) {
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
          Signup.signup($scope.signupData).then(callbackRegistrazione);
        }
      });
    }
  };
})
