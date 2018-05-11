const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MONGOOSE = require('mongoose');

//Conexion a la BD
MONGOOSE.connect('mongodb://localhost/yelp_camp');

//SCHEMA SETUP
var campgroundSchema = new MONGOOSE.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = MONGOOSE.model('Campground', campgroundSchema);

// Campground.create({
//     name: 'Neusa' , 
//     image: 'https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg',
//     description: 'Este es un lugar mu especial'
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Newly created Campgroud: ');
//         console.log(campground);
//     }
// });

//config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//routes
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
    //Busca el campground con el id entregado
    //Campground.find
    res.send('Vamos bien')
});

//CREATE Agrega un nuevo campground a la BD.
app.post('/campgrounds', function (req, res) {
    console.log(req.body);
    var nameCamp = req.body.name;
    var imgCamp = req.body.imgurl; 
    //crea el objeto ien la bd
    var newCampgroud = {name: nameCamp, image: imgCamp};
    Campground.create(newCampgroud, function (err, newlycreate){
        if(err){
            console.log(err);
        } else {
            //redirecciono al campgrounds page
            res.redirect('/campgrounds');
        }
    });
    
});

//server
app.listen(process.env.PORT || 3000, function(){
    console.log('Server listen port 3000!!!');
})
