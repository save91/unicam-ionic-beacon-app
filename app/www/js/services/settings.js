angular.module('app.services.settings',[])

.factory('Settings', function($http, MY_SERVER, $q) {
  return {
    hello: function() {
      var deferred = $q.defer();
      $http.get(MY_SERVER.get() + '/hello')
      .then(function(req,res) {
        deferred.resolve('Hello, ' + name + '!');
      }, function(req,res) {
        deferred.reject('Greeting ' + name + ' is not allowed.');
      })

      return deferred.promise;
    }
  };
});
