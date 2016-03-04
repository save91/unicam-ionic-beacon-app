angular.module('app.services.devices',[])

.factory('Devices', function($http, MY_SERVER, $q) {

	var devices = [];

	return {
		all: function() {
			return $http({
				method: 'GET',
				url: MY_SERVER.get() + '/device/output'
			});
		}/*,
		comando: function(url) {
			$http({
				method: 'GET',
				url: MY_SERVER.get() + '/' + url
			}).then(function(response) {
				console.log("OK");
			}, function(response) {
				console.log("ERRORE");
			});
		}*/,
		setGPIO: function(id, value) {
			return $http.put(MY_SERVER.get() + '/gpio/' + id + '/set',
			{
				value: value
			}
		);
	}
};
});
