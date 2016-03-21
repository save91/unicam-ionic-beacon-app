// Ionic Starter App

var app = angular.module('app', [
  'ionic',
  'ngCordova',
  'app.controllers.home',
  'app.controllers.menu',
  'app.controllers.devices',
  'app.controllers.search',
  'app.controllers.settings',
  'app.services.devices',
  'app.services.signup',
  'app.services.devices',
  'app.services.ibeacons',
  'app.services.settings',
  'app.services.login'])
  .run(function($ionicPlatform, $http, Login, $ionicHistory, $cordovaBeacon) {

    $ionicPlatform.ready(function() {


      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      $cordovaBeacon.requestWhenInUseAuthorization();
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
      if(window.localStorage["user"]) {
        var user = JSON.parse(window.localStorage["user"]);
        Login.user.username = user.username,
        Login.user.firstname = user.firstname,
        Login.user.lastname = user.lastname,
        Login.user.permission = user.permission,
        Login.user.photo = user.photo,
        Login.user.block = user.block
      }
    });
  })
  .constant("MY_SERVER", {
    "url": window.localStorage['server'] ? window.localStorage['server'].split(':')[0] : "192.168.1.109",
    "port": window.localStorage['server'] ? window.localStorage['server'].split(':')[1] : "8000",
    "get": function() { return "http://" + this.url + ":" + this.port }
  })
