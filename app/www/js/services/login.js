angular.module('app.services.login',[])

.factory('Login', function($http, MY_SERVER, $q) {
  return {
    login: function(username, password) {
      var deferred = $q.defer();
      $http.post(MY_SERVER.get() + '/user/login',
      {
        username: username,
        password: password
      }).then(function(response) {
        deferred.resolve(response.data);
      },function(response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    },
    getUser: function(username) {
      return $http.get(MY_SERVER.get() + '/user/' + username);
    }
  };
});
