angular.module('app.services.login',[])

.factory('Login', function($http, MY_SERVER) {
  return {
    login: function(username, password) {
      return $http.post(MY_SERVER.get() + '/login',
      {
        username: username,
        password: password
      }).then(function(response) {
        return {
          status: response.status,
          utente: response.data};
        },function(response) {
          return {
            status: response.status
          };
        });
      },
      stato: function() {
        return $http.post(MY_SERVER.get() + '/stato_utente',
        {
          username: username,
          password: password
        }).then(function(response) {
          return {
            status: response.status,
            utente: response.data};
          },function(response) {
            return {
              status: response.status
            };
          });
        }

      };
    });
