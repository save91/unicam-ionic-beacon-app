angular.module('app.services.dispositivi',[])

.factory('Dispositivi', function($http, $ionicPopup, MY_SERVER) {

	var dispositivi = [];

  return {
  	all: function() {
			return $http({
						method: 'GET',
						url: MY_SERVER.get() + '/dispositivi_output'
					}).then(function(response) {
						return response.data;
					});
  	},
		comando: function(url) {
			$http({
        method: 'GET',
        url: MY_SERVER.get() + '/' + url
      }).then(function(response) {
        console.log("OK");
      }, function(response) {
        console.log("ERRORE");
      });
		},
		setGPIO: function(id, value) {
        return $http.post(MY_SERVER.get() + '/gpio_set',
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
