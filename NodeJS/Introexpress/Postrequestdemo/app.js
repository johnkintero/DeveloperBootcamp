var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var friends = ['Carlos', 'Ana', 'Maria', 'Jenny', 'Cristian'];

//config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/friends', function (req, res) {
  res.render('friends', { friends: friends });
});

app.post('/addfriend', function (req, res) {
  //console.log(req.body);
  var newfriend = req.body.newfriend;
  friends.push(newfriend);
  res.redirect('/friends');
});

//Server
app.listen(3000, function () {
  console.log('Server Started!!!');
});
