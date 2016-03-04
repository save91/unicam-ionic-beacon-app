angular.module('app.services.settings',[])

.factory('Settings', function($http, MY_SERVER, $q) {
  return {
    hello: function(ip) {
      var deferred = $q.defer();
      $http.get('http://' + ip + ':8000/hello')
      .then(function(req,res) {
        deferred.resolve(ip);
      }, function(req,res) {
        deferred.reject(ip);
      })
      return deferred.promise;
    }
  };
});
