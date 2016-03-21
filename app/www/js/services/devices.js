angular.module('app.services.devices',[])

.factory('Devices', function($http, MY_SERVER, $q) {

	var devices = [];

	return {
		all: function() {
			return $http({
				method: 'GET',
				url: MY_SERVER.get() + '/device/output'
			});
		},
		action: function(id, value) {
			return $http.put(MY_SERVER.get() + '/device/' + id + '/' + value);
	}
};
});
