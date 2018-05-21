const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MONGOOSE = require('mongoose');
const Campground = require('./models/campgrounds');
const SEEDS = require('./seeds');


/***************************************************************************************/
//Conexion a la BD
/***************************************************************************************/
MONGOOSE.connect('mongodb://localhost/yelp_campv2', function (err){
    if (err){
        console.log('Error conectando a la base de datos :');
        console.log(err);
    }
});
/*-------------------------------------------------------------------------------------*/
/***************************************************************************************/
//config
/***************************************************************************************/
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
/*-------------------------------------------------------------------------------------*/
SEEDS();
/***************************************************************************************/
//routes
/***************************************************************************************/
app.get('/', function (req, res) {
    res.render('landing');
});

//INDEX muestra todos los campgrounds
app.get('/campgrounds', function (req, res) {
    //Obtiene la informacion de la BD
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('index', {campgrounds: allcampgrounds});
        }
    });
});

// NEW Muestra el formulario para la creacion de un nuevo campground
app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

//SHOW Muestra la informacion de un campground especifico
app.get('/campgrounds/:id', function (req, res) {
    //Busca el campground con el id entregado y trae la informacion referencia a los 
    //comentarios
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        }else{
            res.render('show', {campground: foundCampground});
        }
    });
});

//CREATE Agrega un nuevo campground a la BD.
app.post('/campgrounds', function (req, res) {
    console.log(req.body);
    var nameCamp = req.body.name;
    var imgCamp = req.body.imgurl; 
    var descCamp = req.body.description;
    //crea el objeto ien la bd
    var newCampgroud = {name: nameCamp, image: imgCamp, description: descCamp};
    Campground.create(newCampgroud, function (err, newlycreate){
        if(err){
            console.log(err);
        } else {
            //redirecciono al campgrounds page
            res.redirect('/campgrounds');
        }
    });
    
});
/*-------------------------------------------------------------------------------------*/
/***************************************************************************************/
//server
/***************************************************************************************/
app.listen(process.env.PORT || 3000, function(){
    console.log('Server listen port 3000!!!');
});
/*-------------------------------------------------------------------------------------*/