const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MONGOOSE = require('mongoose');
const Campground = require('./models/campgrounds');
const SEEDS = require('./seeds');
const Comment = require('./models/comments');


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
//ROUTES CAMPGROUNDS
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
            res.render('campgrounds/index', {campgrounds: allcampgrounds});
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
            res.render('campgrounds/show', {campground: foundCampground});
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
//COMMENTS ROUTES
/***************************************************************************************/
//New Comment to campground
app.get('/campgrounds/:id/comments/new', function (req, res) {
    let campId = req.params.id;
    Campground.findById(campId, function(err, fcamp){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new',{campground :  fcamp});
        }
    });
});

//Create Comment and asign to campground
app.post('/campgrounds/:id/comments', function (req, res) {
    //retorna un objeto completo
    let newComment = req.body.comment;
    let campId = req.params.id;
    Comment.create(newComment, function (err, newcomm){
        if(err){
            console.log(err);
        } else {
            console.log('Se creo el nuevo comentario: ' + newcomm._id );
            Campground.findById(campId, function(err, fundcamp){
                if(err){
                    console.log(err);   
                } else {
                    fundcamp.comments.push(newcomm);
                    fundcamp.save();
                    res.redirect('/campgrounds/'+ campId);
                }
            });
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