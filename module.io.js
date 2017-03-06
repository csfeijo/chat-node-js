function Io(data) {
  var io = data.io,
      USERS = [];

  io.on('connection', function(socket) {  
    console.log('user connected');

    socket.on('add-user', function(data) {
      var nickName = data.nickName,
          userExist = false;

      for (var index = 0; index < USERS.length; index++){
        if (USERS[index].nickName == data.nickName){
          userExist = true;
        }
      }

      if(userExist === false) {
        USERS.push({ nickName: nickName });
      }
    });

    // TODO: the USERS isnt avaliable in the first message!!
    io.emit('new-message', { message: 'new user logged!', nickName: 'SERVER', users: USERS });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    socket.on('logout', function(data) {
      console.log('user logout');

      // TODO: improve this implementation - add this feature when users is disconnected with another methods
      for (var index = 0; index < USERS.length; index++){
        if (USERS[index].nickName == data.nickName){
          console.log('removed user', data.nickName);
          USERS.splice(index, 1);
        }
      }
    });

    socket.on('chat-message', function(data) {  
      console.log('nickName: ' + data.nickName, 'message: ' + data.message);

      io.emit('new-message', { message: data.message, nickName: data.nickName, users: USERS });
    });

  });
  return io;
}

module.exports = Io;
