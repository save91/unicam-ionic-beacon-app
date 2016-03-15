angular.module('app.services.login',[])

.factory('Login', function($http, MY_SERVER, $q) {
  var Login = {
    user: {
      username: ""
    },
    connection: {
      state: true
    }
  };
  Login.login = function(username, password) {
    var deferred = $q.defer();
    $http.post(MY_SERVER.get() + '/user/login',
    {
      username: username,
      password: password
    }).then(function(response) {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa(username + ':' + password);
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
      Login.user.username = response.data.username,
      Login.user.firstname = response.data.firstname,
      Login.user.lastname = response.data.lastname,
      Login.user.permission = response.data.permission,
      Login.user.photo = response.data.photo,
      Login.user.block = response.data.block
      window.localStorage['user'] = JSON.stringify(Login.user);
      deferred.resolve(response.data);
    },function(response) {
      deferred.reject(response.data);
    });
    return deferred.promise;
  };
  Login.logout = function() {
    Login.user.username = "";
    $http.defaults.headers.common.Authorization = "";
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('Authorization');
  };
  return Login;
});
