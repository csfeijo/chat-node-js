function Io(data) {
  var io = data.io;

  io.on('connection', function(socket) {  
    console.log('user connected');

    io.emit('new-message', { message: 'new user logged!', nickName: 'SERVER' });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    socket.on('logout', function() {
      console.log('user logout');
    });

    socket.on('chat-message', function(data) {  
      console.log('nickName: ' + data.nickName, 'message: ' + data.message);

      io.emit('new-message', { message: data.message, nickName: data.nickName });
    });

  });
  return io;
}

module.exports = Io;
