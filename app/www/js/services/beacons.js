angular.module('todo.services.beacons',[])
.constant("myServer", {
		"url": "http://192.168.1.147",
		"port": "80"
})
.factory('Beacons', function($http, $ionicPopup, myServer) {

	var beacons = [];
  var stato = {messaggio: ''};
  var aggiornamento = function() {
  beacons = [];
	stato.messaggio = 'Ricerca in corso...';
  $http({
        method: 'GET',
        url: myServer.url + ':' + myServer.port + '/beacons'
      }).then(function(response) {
        for(var i = 0;i < response.data.length;i++)
        {
          beacons.push(response.data[i]);
        }
        stato.messaggio = '';

      }, function(response) {
        var alertPopup = $ionicPopup.alert({
          title: 'ERRORE!',
          template: 'Status: '+response.status
        });
        stato.messaggio = 'Niente';
        console.log(response.data);
      });
      return beacons;
    };

  return {
  	all: function() {
			aggiornamento();
  		return beacons;
  	},
    stato: function() {
      return stato;
    },
    aggiorna: function() {
      aggiornamento();
      return beacons;
    },
		comando: function(url) {
			$http({
        method: 'GET',
        url: myServer.url + ':' + myServer.port + '/' + url
      }).then(function(response) {
        console.log("OK");
      }, function(response) {
        console.log("ERRORE");
      });
		},
    getBeacon: function(elem) {
      var beacon = {
        id :'',
        nome: '',
        descrizione: '',
        url: '',
				azioni: [{nome: 'Test', azione: 'accendi'}]
      };
      $http({
        method: 'GET',
				cache: false,
        url: myServer.url + ':' + myServer.port + '/beacon/' + elem
      }).then(function(response) {
        beacon.id = response.data.id;
        beacon.nome = response.data.nome;
        beacon.descrizione = response.data.descrizione;
        beacon.url = response.data.url;
				beacon.azioni = response.data.azioni;
      }, function(response) {
        var alertPopup = $ionicPopup.alert({
          title: 'ERRORE!',
          template: 'Status: '+response.status
        });
      });
      return beacon;
    }
  };
});
