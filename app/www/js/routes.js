app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });
  $stateProvider.state('dispositivi', {
    url: '/dispositivi',
    templateUrl: 'templates/dispositivi.html',
    controller: 'DispositiviCtrl'
  });
  $stateProvider.state('registrati', {
    url: '/registrati',
    templateUrl: 'templates/registrati.html',
    controller: 'RegistratiCtrl'
  });
});
