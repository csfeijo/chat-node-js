function Routes (data) {
  var app = data.app;

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
  
  return app;
}

module.exports = Routes;
