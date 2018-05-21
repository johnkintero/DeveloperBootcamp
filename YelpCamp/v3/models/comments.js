const MONGOOSE = require('mongoose');

//SCHEMA SETUP
const COMMENTSCHEMA = new MONGOOSE.Schema({
    text: String,
    autor: String
});

module.exports = MONGOOSE.model('Comment', COMMENTSCHEMA);