angular.module('todo.services.beacons',[])
.constant("IP_SERVER", "192.168.24.100:8000")
.factory('Beacons', function($http, $ionicPopup) {

	var beacons = [];
  var stato = {messaggio: ''};
  var aggiornamento = function() {
  beacons = [];
	stato.messaggio = 'Ricerca in corso...';
  $http({
        method: 'GET',
        url: 'http://' + IP_SERVER + '/beacons'
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
    getBeacon: function(elem) {
      var beacon = {
        id :'',
        nome: '',
        descrizione: '',
        url: ''
      };
      $http({
        method: 'GET',
        url: 'http://' + IP_SERVER + '/beacon/' + elem
      }).then(function(response) {
        beacon.id = response.data.id;
        beacon.nome = response.data.nome;
        beacon.descrizione = response.data.descrizione;
        beacon.url = response.data.url
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
