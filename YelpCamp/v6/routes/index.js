const express = require('express');
var router = express.Router();
const Campground = require('../models/campgrounds');
const User = require('../models/users');
const PASSPORT = require('passport');

//Index
router.get('/', function (req, res) {
    req.logout();
    res.render('landing');
});

//Register
router.get('/register', function (req, res) {
    res.render('auth/register')
});

//Register
router.post('/register', function (req, res) {
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

//Login
router.get('/login', function (req, res) {
    res.render('auth/login');
});

//login
router.post('/login', PASSPORT.authenticate('local', {
    successRedirect : '/campgrounds',
    failureRedirect : '/register'
}), function (req, res) {});

//logout
router.get('/logout', function (req, res) {
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
module.exports = router, isLoggedIn;