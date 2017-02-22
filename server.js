var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    hbs = require('express-handlebars'),
    path = require('path');

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')))

app.route('/login')
  .get(function (req, res) {
  res.render('login', {});
});

app.post('/chat', function (req, res, next){
  var nickName = req.body['nick-name'];
  res.render('chat', { name: "to my chat room", nickName: nickName });
});

app.get('/chat', function(req, res, next){
  res.redirect('/login');
});

io.on('connection', function(socket){  
  console.log('user connected');

  io.emit('new-message', { message: 'new user logged!', nickName: 'SERVER' });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('logout', function(){
    console.log('user logout');
  });

  socket.on('chat-message', function(data){  
    console.log('nickName: ' + data.nickName, 'message: ' + data.message);

    io.emit('new-message', { message: data.message, nickName: data.nickName });
  });

});

server.listen(8080);