const MONGOOSE = require('mongoose');

//SCHEMA SETUP
const COMMENTSCHEMA = new MONGOOSE.Schema({
    text: String,
    author: {
        id: {
            type: MONGOOSE.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    }
});

module.exports = MONGOOSE.model('Comment', COMMENTSCHEMA);