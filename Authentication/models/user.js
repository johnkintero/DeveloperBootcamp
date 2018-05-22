const MONGOOSE = require('mongoose');
const PASSPORTLOCALMONGOOSE = require('passport-local-mongoose');

const USERSCHEMA = new MONGOOSE.Schema({
    username: String,
    password: String,
});

USERSCHEMA.plugin(PASSPORTLOCALMONGOOSE);

module.exports = MONGOOSE.model('User', USERSCHEMA);