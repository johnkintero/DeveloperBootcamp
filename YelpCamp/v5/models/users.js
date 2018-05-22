const MONGOOSE = require('mongoose');
const PASSPORTLOCALMONGOOSE =require('passport-local-mongoose');

let UserSchema = new MONGOOSE.Schema({
    user: String,
    password: String,
});

UserSchema.plugin(PASSPORTLOCALMONGOOSE);

module.exports = MONGOOSE.model('User', UserSchema);