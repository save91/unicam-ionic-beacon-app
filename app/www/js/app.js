// Ionic Starter App

var app = angular.module('app', [
  'ionic',
  'app.controllers.home',
  'ngCordova',
  'app.controllers.dispositivi',
  'app.controllers.registrati',
  'app.controllers.cerca',
  'app.services.dispositivi',
  'app.services.registrati',
  'app.services.ibeacons'])
.run(function($ionicPlatform) {
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

  });
})
.constant("MY_SERVER", {
		"url": "http://192.168.1.149",
		"port": "8000",
    "get": function() { return this.url + ":" + this.port }
})
