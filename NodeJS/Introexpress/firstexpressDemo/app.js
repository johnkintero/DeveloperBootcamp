var express = require('express');

// express esta contenida en una unica funcion por lo cual es necesario asignar-
//la a una variable.
var app = express();

//routes
app.get('/', function (req, res) {
  res.send('Hi there!!!');
});

app.get('/bye', function (req, res) {
  res.send('Good bye!!!');
});

//ejemplos patro para rutas
app.get('/r/:subredditName', function (req, res) {
  var subreddit = req.params.subredditName;
  res.send('This is a response patron to request: ' + subreddit);
});

app.get('/r/:subredditName/comments/:id/:title/', function (req, res) {
  res.send('This is a response patron with multiple variables');
});

//ejercicios
app.get('/speak/:animal', function (req, res) {
  var sounds = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof',
    cat: 'Meow',
  };
  var animal = req.params.animal.ToLowerCase();
  var speak = sounds[animal];
  res.send('The ' + animal + ' says ""' + speak + '"');
});

app.get('/repeat/:word/:times', function (req, res) {
  var word = '';
  var times = Number(req.params.times);
  var respuesta = '';
  for (var i = 1; i <= times; i++) {
    word += req.params.word + ' ';
  }

  res.send(word);
});

// si se intenta hacer un get a una ruta que no se encuetra
// se usa * como comodin y se debe dejar de ultimo de los get
app.get('*', function (req, res) {
    res.send('UNDER IN CONSTRUCTION!!!');
  });

//server
//app.listen(process.env.PORT, process.env.IP, function () {
//cuando se esta montado en un servidor en la nube
app.listen(3000, function () {
    console.log('Server has started!!!');
  });
