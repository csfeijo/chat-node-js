var express = require('express'),
    path = require('path'),
    app = express();

var hbs = require('express-handlebars');
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', express.static(path.join(__dirname, 'public')))

app.route('/welcome')
  .get(function (req, res) {
    res.render('welcome', { name: "Lee Vining" });
});


app.listen(8080, function() {
  console.log('Server Running...');
} );