angular.module('app.services.ibeacons',[])

.factory('Beacons', function($http, MY_SERVER) {
  return {
    aggiungi: function(major, minor) {
        return $http.post(MY_SERVER.get() + '/aggiungi_beacon',
          {
            major: major,
            minor: minor
          }
        ).then(function(response) {
          return response.data;
          });
        }
      };
});
