angular.module('app.services.signup',[])

.factory('Signup', function($http, MY_SERVER) {
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
    signup: function(user) {
        return $http.post(MY_SERVER.get() + '/add_user',
          {
            username: user.username,
            name: user.name,
           lastname: user.lastname,
            password: user.password,
          }
        ).then(function(response) {
          return response.data;
          });
        }
      };
});
