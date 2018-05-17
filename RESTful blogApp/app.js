const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//esta libreria es para solucionar el tema del PUT
const methodOverride = require('method-override');
//esta libreria es para evitar el codigo inyectado
var expressSanitizer = require('express-sanitizer');
//CONEXION DB
mongoose.connect('mongodb://localhost/blogAppdb');

//SCHEMA SETUP
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    enter: String,
    autor: String,
    date: {type: Date, default: Date.now}
});
const BlogObj = mongoose.model('blog', blogSchema);

//CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// Mount express-sanitizer here
app.use(expressSanitizer()); // this line follows bodyParser() instantiations
app.use(express.static('public'));
app.use(methodOverride('_method'));
//ROUTES
//INDEX
app.get('/blog', function (req, res) {
    BlogObj.find({}, function (err,allblogs) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {blogs: allblogs});
        }
    });
});
//NEW
app.get('/blog/new', function (req, res){
    res.render('new');
});
//CREATE
app.post('/blog', function (req, res){
    //console.log(req.body);
    let titleBlog = req.body.txtTitle;
    let imgBlog = req.body.txtImage;
    //let enterBlog = req.body.txtEnter;
    let enterBlog = req.sanitize(req.body.txtEnter);
    let autorBlog = req.body.txtAutor;
    //crear en la BD
    let newBlog = {
        title: titleBlog,
        image: imgBlog,
        enter: enterBlog,
        autor: autorBlog
    };
    BlogObj.create(newBlog, function (err, newlyblog){
        if (err) {
            console.log(err);
        } else {
            res.redirect('blog');
        }
    });
});
//SHOW
app.get('/blog/:id', function (req, res) {
    let blogId = req.params.id;
    //console.log(blogId);
    BlogObj.findById(blogId, function (err, foundBlog) {
        if(err){
            console.log('SHOW ERROR: ' + err);
        } else {
            //console.log(foundBlog);
            res.render('show', {blog: foundBlog});
        }
    });
});
//EDIT
app.get('/blog/:id/edit', function (req, res){
    let blogIdEdit = req.params.id;
    BlogObj.findById(blogIdEdit, function (err, foundBlog) {
        if(err){
            res.redirect('/blog')
        }else {
            res.render('edit', {blog: foundBlog});
        }
    });
});
//UPDATE
app.put('/blog/:id', function (req, res) {
    let blogIdUpd = req.params.id;
    let BlogObjUpd = req.body.blog;
    //console.log(req.params);
    BlogObj.findByIdAndUpdate(blogIdUpd, BlogObjUpd, function (err, updBlog){
        if(err){
            console.log('---------------------')
            console.log('Fallo la actualizacion');
            console.log(err);
            console.log('---------------------')
            res.redirect('/blog')
        }else{
            res.redirect('/blog/'+ blogIdUpd);
        }
    });
});
//DESTROY
app.delete('/blog/:id', function (req, res){
    let blogIdDel = req.params.id;
    BlogObj.findOneAndRemove(blogIdDel, function(err){
        if(err){
            res.redirect('/blog')
        } else{
            res.redirect('/blog')
        }
    });
    
});

//SERVER
app.listen(process.env.PORT || 3000, function (){
    console.log('Server Started!!!');
});