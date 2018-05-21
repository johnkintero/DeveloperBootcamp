const MONGOOSE = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comments');
const data = [
    {
        name : 'Campground 1',
        image : 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg',
        description : 'es una carapa',
    },
    {
        name : 'Campground 2',
        image : 'https://images.freeimages.com/images/large-previews/190/tents-1429142.jpg',
        description : 'son varias carpas',
    },
    {
        name : 'Campground 3',
        image : 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg',
        description : 'cabañas',
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log('removed campgrounds!');
        //Add new campgrounds del arreglo
        data.forEach(function(seed){
            Campground.create(seed, function (err, newCampgroud){
                if(err){
                    console.log(err);
                } else {
                    console.log('add campground');
                    Comment.create(
                        {
                            text : 'es un hermoso lugar',
                            autor: 'Homer'
                        }, function (err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                newCampgroud.comments.push(comment);
                                newCampgroud.save();
                                console.log('add comment');
                            }
                        }
                    );
                }
            });    
        });
        
    });
}
module.exports = seedDB;
