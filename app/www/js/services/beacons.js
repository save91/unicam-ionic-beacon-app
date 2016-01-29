angular.module('todo.services.beacons',[])

.factory('Beacons', function($http, $ionicPopup) {

	var beacons = [];
  var stato = {messaggio: 'Ricerca...'};
  var aggiornamento = function() {
  beacons = [];
  $http({
        method: 'GET',
        url: 'http://192.168.1.148/stage/beacons.php'
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
        url: 'http://192.168.1.148/stage/beacon.php?id=' + elem
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
