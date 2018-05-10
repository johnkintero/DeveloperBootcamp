var express = require('express');
var app = express();
var logger = require('morgan');

//config
//utiliza el seguimiento para ver en la consola los request
app.use(logger('dev'));

//define donde se van a buscar los recursos ya que express no maneja directorios
app.use(express.static('public'));

//define el manejador de las vistas
app.set('view engine', 'ejs');

//routes
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/fallinlove/:thing', function (req, res) {
  var thing = req.params.thing;

  //asi se pasan parametros a la vista
  res.render('love', { thing: thing });
});

app.get('/posts', function (req, res) {
  var posts = [
     { titulo: 'Aprender JS', autor: 'JJQ' },
     { titulo: 'Aprender React', autor: 'AWQ' },
     { titulo: 'Aprender Angular', autor: 'CRT' },
     { titulo: 'Aprender Webpack', autor: 'JJQ' },
     ];
  res.render('loop', { posts: posts });
});

//server
app.listen(3000, function () {
  console.log('server is listening');
});
