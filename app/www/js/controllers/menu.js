angular.module('app.controllers.menu', [])

.controller('MenuCtrl', function($scope, $state, $rootScope, $ionicHistory, $ionicLoading, $cordovaToast, MY_SERVER, $ionicPopup, $ionicModal, Login, Signup, Settings, $ionicPlatform, $cordovaCamera, $http) {
  $scope.user = Login.user;
  $scope.connection = Login.connection;

  var show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };

  var hide = function(){
    $ionicLoading.hide();
  };

  var showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Logout',
      template: 'Sei sicuro di volerti disconnettere?'
    });
    return confirmPopup;
  };

  $scope.logout = function() {
    showConfirm().then(function(res) {
      if(res) {
        Login.logout();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.home");
      }
    });
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Form data for the login modal
  $scope.signupData = {
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    check_password: "",
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
      cameraDirection: 0,
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
    show('Controllo credenziali...');
    Login.login($scope.loginData.username, $scope.loginData.password)
    .then(function(user) {
      $scope.closeLogin();
    }, function(error) {
      $ionicPopup.alert({
        title: 'Errore',
        template: 'Username o password errati'
      });
    }).finally(function() {
      hide();
    });
  };

  $scope.checkUsername = function() {
    Signup.checkUsername($scope.signupData.username).then(
      function(response) {
        ok = true;
      }, function(response) {
        ok = false;
      }
    );
  }

  $scope.doSignup = function () {
    var title = "Errore";
    if($scope.signupData.username.trim() === "" || $scope.signupData.firstname.trim() === "" || $scope.signupData.lastname.trim() === "" || $scope.signupData.password.trim() === "") {
      template = "Compila tutti i campi";
      $ionicPopup.alert({
        title: title,
        template: template
      });
    }else if(ok === false) {
      template = "Username già utilizzato";
      $ionicPopup.alert({
        title: title,
        template: template
      });
    }else if ($scope.signupData.password !== $scope.signupData.check_password) {
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
          Signup.signup($scope.signupData).then(
            function(response) {
              window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.signupData.username +':'+$scope.signupData.password);
              $scope.user.username = response.data.username;
              $scope.user.firstname = response.data.firstname;
              $scope.user.lastname = response.data.lastname;
              $scope.user.permission = response.data.permission;
              $scope.user.photo = response.data.photo;
              $scope.user.block = response.data.block;
              window.localStorage['user'] = JSON.stringify($scope.user);
              $scope.signupData = {
                username: "",
                firstname: "",
              lastname: "",
                password: "",
                check_password: "",
                image: {src: "img/account.jpg"}
              };
              $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
              $scope.closeSignup();
            }, function(response) {
              $ionicPopup.alert({
                title: 'Errore',
                template: 'Qualcosa è andato storto. Riprova più tardi!'
              });
            }
          );
        }
      });
    }
  };
})
