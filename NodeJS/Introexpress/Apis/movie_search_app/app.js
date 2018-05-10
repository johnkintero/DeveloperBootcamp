var express = require('express');
var request = require('request');
var app = express();

//config
app.set('view engine', 'ejs');

//routes
app.get('/', function (req, res) {
    res.render('home');
  });

app.get('/results', function (req, res) {
  //recupera la informacion enviada por el request
  var query = req.query.movieName;
  var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var respData = JSON.parse(body);

      //console.log(respData);
      res.render('results', { respData: respData });
    }
  });

});

//server
//app.listen(process.env.PORT, process.env.IP,function(req, res){
//console.log("Server started!!!");
// });
app.listen(3000, function (req, res) {
  console.log('Server started!!!');
});
