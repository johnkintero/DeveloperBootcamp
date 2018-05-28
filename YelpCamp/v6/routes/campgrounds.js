const express = require('express');
var router = express.Router();
const AUTH_ROUTES = require('./index');
const Campground = require('../models/campgrounds');

//INDEX muestra todos los campgrounds
router.get('/', function (req, res) {
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
router.get('/new', isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

//SHOW Muestra la informacion de un campground especifico
router.get('/:id', function (req, res) {
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
router.post('/', isLoggedIn, function (req, res) {

    var nameCamp = req.body.name;
    var imgCamp = req.body.imgurl; 
    var descCamp = req.body.description;
    var authorCamp = {
        id: req.user._id,
        username: req.user.username,
    }
    //crea el objeto ien la bd
    var newCampgroud = {name: nameCamp, image: imgCamp, description: descCamp, author: authorCamp};
    Campground.create(newCampgroud, function (err, newlycreate){
        if(err){
            console.log(err);
        } else {
            //redirecciono al campgrounds page
            res.redirect('/campgrounds');
        }
    });
    
});
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){        
        return next();
    }
    res.redirect('/login');
}
module.exports = router;