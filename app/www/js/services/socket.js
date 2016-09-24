angular.module('app.services.socket',[])

.factory('mySocket', function(socketFactory) {
  var myIoSocket = io.connect();

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });

  return mySocket;
});
