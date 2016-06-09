app.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/app/home');
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  });
  $stateProvider.state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  });

  $stateProvider.state('app.devices', {
    url: '/devices',
    views: {
      'menuContent': {
        templateUrl: 'templates/devices.html',
        controller: 'DevicesCtrl'
      }
    }
  });

  $stateProvider.state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  $stateProvider.state('app.search_ibeacons', {
    url: '/search_ibeacons',
    views: {
      'menuContent': {
        templateUrl: 'templates/search_ibeacons.html',
        controller: 'SearchCtrl'
      }
    }

  });
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('amber')
});
