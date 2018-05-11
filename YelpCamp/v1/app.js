const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var campgrounds = [
    {name: 'Neusa' , image: 'https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg'},
    {name: 'Tatacoa' , image: 'https://cdn.pixabay.com/photo/2017/07/17/16/21/turkey-2512944_960_720.jpg'},
    {name: 'Playa blanca' , image: 'https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061_960_720.jpg'},
]

//config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    //pasa como parametro los valores del array global definido
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

app.post('/campgrounds', function (req, res) {
    console.log(req.body);
    
    var nameCamp = req.body.name;
    var imgCamp = req.body.imgurl; 
    //crea el objeto igual a los definidos en el array para poder agregarlo
    var newCampgroud = {name: nameCamp, image: imgCamp};
    campgrounds.push(newCampgroud);
    //redirecciono al campgrounds page
    res.redirect('/campgrounds');
});

//server
app.listen(process.env.PORT || 3000, function(){
    console.log('Server listen port 3000!!!');
})
