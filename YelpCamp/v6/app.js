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
//Routes
const CAMPGROUND_ROUTES = require('./routes/campgrounds');
const COMMENT_ROUTES = require('./routes/comments');
const INDEX_ROUTES = require('./routes/index');

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
//middleware para validar el usuario tiene que ir despues de la configuracion del Passport
//si no no funciona.
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', INDEX_ROUTES);
app.use('/campgrounds', CAMPGROUND_ROUTES);
app.use('/campgrounds/:id/comments', COMMENT_ROUTES);
/*-------------------------------------------------------------------------------------*/
//seed database
//SEEDS();

/***************************************************************************************/
//server
/***************************************************************************************/
app.listen(process.env.PORT || 3000, function(){
    console.log('Server listen port 3000!!!');
});
/*-------------------------------------------------------------------------------------*/