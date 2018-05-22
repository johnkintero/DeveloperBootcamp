const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const MONGOOSE = require('mongoose');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local');
const PASSPORTLOCALMONGOOSE = require('passport-local-mongoose');
const USER = require('./models/user');
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//CONFIG
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
MONGOOSE.connect('mongodb://localhost/auth_demo_app');

const APP = EXPRESS();
APP.set('view engine', 'ejs');
APP.use(require('express-session')({
    secret: 'Hulk es el mejor perro del mundo',
    resave: false,
    saveUninitialized: false,
}));
APP.use(PASSPORT.initialize());
APP.use(PASSPORT.session());
APP.use(BODYPARSER.urlencoded({extended: true}));
PASSPORT.use(new LOCALSTRATEGY(USER.authenticate()));
PASSPORT.serializeUser(USER.serializeUser());
PASSPORT.deserializeUser(USER.deserializeUser());
/*-------------------------------------------------------------------------------------*/

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//ROUTES
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
APP.get('/', function (req, res) {
    res.render('home');
});

APP.get('/secret', isLoggedIn ,function (req, res) {
    res.send('Hello Secret');
});

//Auth Routes
APP.get('/register', function (req, res) {
    res.render('register');
});
APP.post('/register', function (req, res) {
    USER.register(new USER({username : req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect('/login');
        } else {
            PASSPORT.authenticate('local')(req, res, function(){
                res.redirect('/secret');
            });
        }
    });
});

APP.get('/login', function (req, res) {
    res.render('login');
});
APP.post('/login',  PASSPORT.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
}), function (req, res) {
});

APP.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

/*-------------------------------------------------------------------------------------*/

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//SERVER
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
APP.listen(process.env.PORT || 3000, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Server Started!!!');
        
    }
});

/*-------------------------------------------------------------------------------------*/


