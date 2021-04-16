import {Server, Socket} from 'socket.io';

export const webSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
    },
  }); // koneksi

  io.on('connection', (socket: Socket) => {
    var Uid = socket.handshake.query.uid.toString();
    console.log('User : ' + socket.id);
    socket.join(Uid);
    //Leave the room if the user closes the socket
    socket.on('disconnect', (res) => {
      console.log('disconnect : ' + res);
      socket.leave(Uid);
    });
  });
};
