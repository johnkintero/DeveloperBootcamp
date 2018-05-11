const mongoose = require('mongoose');
//conexion a la BD
mongoose.connect('mongodb://localhost/cat_app');
//define el schema
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
//lo convierte en modelo
var Cat = mongoose.model('Cat', catSchema);

// //adding a new cat to the db
// var george = new Cat({
//     name: 'George',
//     age:11,
//     temperament: 'Grounchy'
// });
//crear un nuev objeto 1
// george.save(function(err, cat){
//     if(err){
//         console.log('Algo salio Mal');
//     } else {
//         console.log('Almacenado');
//         console.log(cat);
//     }
// });

// Crear un nuevo objeto 2
Cat.create({
    name: 'Snow',
    age: 15,
    temperament: 'Happy'
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});

//recuperar los datos de una colleccion
Cat.find({}, function(err, cats){
    if(err){
        console.log('Algo salio Mal');
        console.log(err);
    }else{
        console.log('Los Datos son:');
        console.log(cats);
    }
})


