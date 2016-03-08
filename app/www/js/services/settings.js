angular.module('app.services.settings',[])

.factory('Settings', function($http) {
  return {
    hello: function(ip, port) {
      return $http.get('http://' + ip + ':' + port + '/hello');
    }
  };
});
