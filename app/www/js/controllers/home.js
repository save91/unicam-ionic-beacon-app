angular.module('app.controllers.home', [])

.controller('HomeCtrl', function($scope, $location, MY_SERVER, $ionicPopup, $ionicModal, Login, Signup, Settings, $ionicPlatform, $cordovaCamera, $http) {
  $scope.utente = {};

  $scope.logout = function() {
    $http.defaults.headers.common.Authorization = "";
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('Authorization');
    $scope.user = null;
  }

  $scope.check_connection = function() {
    Settings.hello(MY_SERVER.url, MY_SERVER.port)
      .then(function(response) {
        $scope.connection = true;
      },function(response) {
        $scope.connection = false;
      })
  }

  //Start ip
  $scope.ip = "";
  $scope.getIp = function() {
    networkinterface.getIPAddress(function (readIp) {
      $scope.ip = readIp;
      $scope.$apply();
    });
  }
  //End ip

  //Start search server
  $scope.servers = [];

  $scope.getServers = function() {
    var count = 0;
    $scope.servers = [];
    for(var i = 1; i < 255; i++) {
      Settings.hello("192.168.1." + i).then(function(resIp) {
        $scope.servers.push({ip: resIp});
        $scope.$apply();
      }, function(resIp) {
        console.log("IP " + resIp);
      })
      .finally(function() {
        count++;
      });
    }
  }
  //End

  $scope.$on('$ionicView.enter',function(){
    $scope.connection = false;
    $scope.check_connection();
    if(window.localStorage['user']) {
      $scope.user = {};
      $scope.user = JSON.parse(window.localStorage['user']);
    } else {
      $scope.user = null;
    }
  });

  $scope.check = function() {
    Login.getUser($scope.user.username)
      .then(function(response) {
        $scope.user = response.data;
        window.localStorage['user'] = JSON.stringify($scope.user);
      },function(response) {
        $scope.user = null;
        window.localStorage.removeItem('user');
      })
  }

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
    Login.login($scope.loginData.username, $scope.loginData.password)
    .then(function(user) {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.loginData.username +':'+$scope.loginData.password);
      $scope.user = user;
      window.localStorage['user'] = JSON.stringify($scope.user);
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
      $scope.closeLogin();
    }, function(error) {
      $ionicPopup.alert({
        title: 'Errore',
        template: error
      });
    });
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
  $scope.check_connection();
})
