const MONGOOSE = require('mongoose');
//CONEXION
MONGOOSE.connect('mongodb://localhost/blog_demo');
//SCHEMAS
const POSTSCHEMA = new MONGOOSE.Schema({
    title: String,
    content: String,
});
const POST = MONGOOSE.model('Post', POSTSCHEMA);
const USERSCHEMA = new MONGOOSE.Schema({
    email: String,
    name: String,
    posts: [POSTSCHEMA]
});
const USER = MONGOOSE.model('User', USERSCHEMA);

let newUser = new USER({
    email: 'john@app.com',
    name: 'john',
});
newUser.posts.push({
    title: 'Utilizando asocioaciones en MongoDB',
    content: 'Se debe declarar primero la informacion que se va a vincular como este ejemplo',
});

newUser.save(function (err, user){
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});
console.log('-----------------------');

USER.findOne({name:'john'}, function (err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: 'Segundo post',
            content: 'Insertando informacion a un user buscado',
        });
        user.save(function(err, userpost){
            if(err){
                console.log(err);
                
            } else {
                console.log(userpost);
                
            }
        });
    }
});
