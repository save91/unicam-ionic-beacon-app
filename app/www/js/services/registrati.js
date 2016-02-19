angular.module('app.services.registrati',[])

.factory('Registrati', function($http, MY_SERVER) {
  return {
    checkUsername: function(username) {
        return $http.post(MY_SERVER.get() + '/check_username',
          {
            username: username
          }
        ).then(function(response) {
          return response.data;
          });
        },
    registrati: function(user) {
        return $http.post(MY_SERVER.get() + '/aggiungi_utente',
          {
            username: user.username,
            nome: user.nome,
            cognome: user.cognome,
            password: user.password,
          }
        ).then(function(response) {
          return response.data;
          });
        }
      };
});
