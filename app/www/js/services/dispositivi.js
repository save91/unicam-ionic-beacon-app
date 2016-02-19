angular.module('app.services.dispositivi',[])

.factory('Dispositivi', function($http, $ionicPopup, MY_SERVER) {

	var dispositivi = [];

  return {
  	all: function() {
			return $http({
						method: 'GET',
						url: MY_SERVER.url + ':' + MY_SERVER.port + '/dispositivi_output'
					}).then(function(response) {
						return response.data;
					});
  	},
		comando: function(url) {
			$http({
        method: 'GET',
        url: MY_SERVER.url + ':' + MY_SERVER.port + '/' + url
      }).then(function(response) {
        console.log("OK");
      }, function(response) {
        console.log("ERRORE");
      });
		},
		setGPIO: function(id, value) {
        return $http.post(MY_SERVER.url + ':' + MY_SERVER.port + '/gpio_set',
          {
            id: id,
            value: value
          }
        ).then(function(response) {
          return response.data;
          });
        }
  };
});
