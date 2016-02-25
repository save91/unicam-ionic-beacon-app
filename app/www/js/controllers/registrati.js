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


})
