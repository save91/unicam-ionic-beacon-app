angular.module('app.services.signup',[])

.factory('Signup', function($http, MY_SERVER) {
  return {
    checkUsername: function(username) {
      return $http.post(MY_SERVER.get() + '/api/v2.0/user/check_username',
      {
        username: username
      });
    },
    signup: function(user) {
      return $http.post(MY_SERVER.get() + '/api/v2.0/user',
      {
        photo: user.image.src,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
      }
    );
  }
};
});
