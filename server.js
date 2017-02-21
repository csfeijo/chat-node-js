var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    hbs = require('express-handlebars'),
    path = require('path');

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', express.static(path.join(__dirname, 'public')))

app.route('/welcome')
  .get(function (req, res) {

  res.render('welcome', { name: "Cícero Feijó" });
});

io.on('connection', function(socket){  
  console.log('um usuario conectou');

  socket.on('disconnect', function(){
    console.log('usuario desconectou');
  });

  socket.on('chat message', function(data){  
    console.log('message: ' + data.message);
  });

});

server.listen(8080);