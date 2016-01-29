app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });
  $stateProvider.state('beacons', {
    url: '/beacons',
    templateUrl: 'templates/beacons.html',
    controller: 'BeaconsCtrl'
  });
  $stateProvider.state('beacon', {
    url: '/beacon/:id',
    templateUrl: 'templates/beacon.html',
    controller: 'BeaconCtrl',
    resolve: {
    beacon: function($stateParams, Beacons) {
      return Beacons.getBeacon($stateParams.id)
    }
  }
  });
});