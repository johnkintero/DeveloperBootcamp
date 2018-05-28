const MONGOOSE = require('mongoose');

//SCHEMA SETUP
const CAMPGOUNDSCHEMA = new MONGOOSE.Schema({
    name: String,
    image: String,
    description: String,
    comments : [
        {
            type: MONGOOSE.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    author:{
        id: {
            type: MONGOOSE.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    }
});

module.exports = MONGOOSE.model('Campground', CAMPGOUNDSCHEMA);