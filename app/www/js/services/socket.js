angular.module('app.services.socket',[])

.factory('mySocket', function(socketFactory, MY_SERVER) {
  var myIoSocket = io.connect(MY_SERVER.get());

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });

  return mySocket;
});
