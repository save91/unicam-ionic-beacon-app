app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/home');
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'HomeCtrl'
  });
  $stateProvider.state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  });
  $stateProvider.state('app.dispositivi', {
    url: '/dispositivi',
    views: {
      'menuContent': {
        templateUrl: 'templates/dispositivi.html',
        controller: 'DispositiviCtrl'
      }
    }

  });
  $stateProvider.state('app.registrati', {
    url: '/registrati',
    views: {
      'menuContent': {
        templateUrl: 'templates/registrati.html',
        controller: 'RegistratiCtrl'
      }
    }

  });
  $stateProvider.state('app.cerca_ibeacons', {
    url: '/cerca_ibeacons',
    views: {
      'menuContent': {
        templateUrl: 'templates/cerca_ibeacons.html',
        controller: 'CercaCtrl'
      }
    }

  });
  $stateProvider.state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }

  });
});
