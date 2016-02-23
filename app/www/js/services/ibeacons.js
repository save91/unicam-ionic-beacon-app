angular.module('app.services.ibeacons',[])

.factory('Beacons', function($http, MY_SERVER) {
  return {
    aggiungi: function(uuid, major, minor) {
        return $http.post(MY_SERVER.get() + '/aggiungi_beacon',
          {
            uuid: uuid,
            major: major,
            minor: minor
          }
        ).then(function(response) {
          return response.data;
          });
        },
    all: function() {
      return $http.get(MY_SERVER.get() + '/beacons')
        .then(function(response) {
          return response.data;
        });
      }
    };
});
