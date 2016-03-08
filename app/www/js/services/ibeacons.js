angular.module('app.services.ibeacons',[])

.factory('Beacons', function($http, MY_SERVER) {
  return {
    aggiungi: function(uuid, major, minor) {
      return $http.post(MY_SERVER.get() + '/beacon',
      {
        uuid: uuid,
        major: major,
        minor: minor
      }
    );
  },
  all: function() {
    return $http.get(MY_SERVER.get() + '/beacon');
  }
};
});
