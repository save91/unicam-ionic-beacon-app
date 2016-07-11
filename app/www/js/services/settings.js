angular.module('app.services.settings',[])

.factory('Settings', function($http, $q) {
  return {
    hello: function(ip, port) {
      var deferred = $q.defer();
      $http.get('http://' + ip + ':' + port + '/api/v2.0/setting/hello').then(
        function(res) {
          if(res.data.name === "ProximitySystem") {
            var response = {
              ip: ip,
              port: res.data.port,
              name: res.data.name,
              version: res.data.version
            };
            deferred.resolve(response);
          } else {
            deferred.reject("Server attivo senza ProximitySystem");
          }
        }, function(res) {
          deferred.reject(res.data);
        }
      );
      return deferred.promise;
    }
  };
});
