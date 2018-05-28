const  express = require('express');
var router = express.Router({mergeParams: true});// sirve para compartir los parametros entre las rutas
const Campground = require('../models/campgrounds');
const Comment = require('../models/comments');

//New Comment to campground
router.get('/new', isLoggedIn, function (req, res) {
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
router.post('/', isLoggedIn, function (req, res) {
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
                    //add username and id to comment
                    newcomm.author.id = req.user._id;
                    newcomm.author.username = req.user.username;
                    newcomm.save();
                    fundcamp.comments.push(newcomm);
                    fundcamp.save();
                    res.redirect('/campgrounds/'+ campId);
                }
            });
        }
    });
});
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){        
        return next();
    }
    res.redirect('/login');
}
/*-------------------------------------------------------------------------------------*/
module.exports = router;