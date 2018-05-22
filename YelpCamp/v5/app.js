const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MONGOOSE = require('mongoose');
const Campground = require('./models/campgrounds');
const SEEDS = require('./seeds');
const Comment = require('./models/comments');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local');
const PASSPORTLOCALMONGOOSE = require('passport-local-mongoose');
const User = require('./models/users');

/***************************************************************************************/
//Conexion a la BD
/***************************************************************************************/
MONGOOSE.connect('mongodb://localhost/yelp_campv5', function (err){
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
app.use(express.static(__dirname + '/public'));
//middleware para validar el usuario
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Hulk es el mejor perro del mundo',
    resave: false,
    saveUninitialized: false,
}));
app.use(PASSPORT.initialize());
app.use(PASSPORT.session());
PASSPORT.use(new LOCALSTRATEGY(User.authenticate()));
PASSPORT.serializeUser(User.serializeUser());
PASSPORT.deserializeUser(User.deserializeUser());
/*-------------------------------------------------------------------------------------*/
SEEDS();
/***************************************************************************************/
//ROUTES CAMPGROUNDS
/***************************************************************************************/
app.get('/', function (req, res) {
    req.logout();
    res.render('landing');
});

//INDEX muestra todos los campgrounds
app.get('/campgrounds', function (req, res) {
console.log(req.user);
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
app.get('/campgrounds/new', isLoggedIn, function (req, res) {
    res.render('new');
});

//SHOW Muestra la informacion de un campground especifico
app.get('/campgrounds/:id', function (req, res) {
    console.log(req.user);
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
app.post('/campgrounds', isLoggedIn, function (req, res) {

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
app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
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
app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
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
//AUTH ROUTES
/***************************************************************************************/
app.get('/register', function (req, res) {
    res.render('auth/register')
});

app.post('/register', function (req, res) {
    let newuser = new User({username: req.body.username});
    User.register(newuser, req.body.password, function (err, newUser) {
        if(err){
            console.log(err);
            return res.render('/register');
        } else {
            PASSPORT.authenticate('local')(req, res, function(){
                res.redirect('/campgrounds');
            });
        }
    })
});

app.get('/login', function (req, res) {
    res.render('auth/login');
});

app.post('/login', PASSPORT.authenticate('local', {
    successRedirect : '/campgrounds',
    failureRedirect : '/register', 
}), function (req, res) {});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
/*-------------------------------------------------------------------------------------*/

/***************************************************************************************/
//server
/***************************************************************************************/
app.listen(process.env.PORT || 3000, function(){
    console.log('Server listen port 3000!!!');
});
/*-------------------------------------------------------------------------------------*/