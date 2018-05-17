const MONGOOSE = require('mongoose');
//CONEXION
MONGOOSE.connect('mongodb://localhost/blog_demo2');
//SCHEMAS
const POSTSCHEMA = new MONGOOSE.Schema({
    title: String,
    content: String,
});
const POST = MONGOOSE.model('Post', POSTSCHEMA);
const USERSCHEMA = new MONGOOSE.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: MONGOOSE.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});
const USER = MONGOOSE.model('User', USERSCHEMA);
/*---------------------------------------------------------------------------------*/
//CREA UN USUARIO
/*---------------------------------------------------------------------------------*/
// USER.create({
//     email: 'milena@app.com',
//     name: 'milena calvachi'
// });
/*---------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------*/
//CREA UN POST
/*---------------------------------------------------------------------------------*/
// POST.create({
//     title: 'UNO',
//     content: 'blah blah blah',
// }, function(err, post){
//     if(err){
//         console.log(err);
        
//     } else {
//         console.log(post);
        
//     }
// });
/*---------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------*/
//CREA UN POST Y LO RELACIONA CON UN USUARIO.
/*---------------------------------------------------------------------------------*/
// POST.create({
//     title: 'DOS',
//     content: 'DGDFGSDFGDFSGDSGSDFG',
// }, function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         USER.findOne({email: 'milena@app.com'}, function (err, foundUser){
//             if (err){
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function (err, data){
//                     if (err){
//                         console.log(err)
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });
/*---------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------*/
//CONSULTAR UN USUARIO CON TODOS SUS POSTS
/*---------------------------------------------------------------------------------*/
USER.findOne({email: 'milena@app.com'}).populate('posts').exec(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});
/*---------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------*/
//CONSULTA UN POST ESPECIFICO Y SE LO RELACIONA A UN USUARIO
/*---------------------------------------------------------------------------------*/
// POST.findOne({title: 'UNO'}, function (err, post){
//     if(err){
//         console.log(err);
//     } else {
//         USER.findOne({email: 'milena@app.com'}, function (err, foundUser){
//             if (err){
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function (err, data){
//                     if (err){
//                         console.log(err)
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });
/*---------------------------------------------------------------------------------*/