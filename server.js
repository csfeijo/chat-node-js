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
app.use('/', express.static(path.join(__dirname, 'public')));

require('./module.routes.js')({ app: app });

require('./module.io.js')({ io : io });

server.listen(8080);
