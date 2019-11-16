const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const mongoose = require('mongoose');
const MovieModel = require('./models/Movie');
const GenreModel = require('./models/Genre');
const UserModel = require('./models/User');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/movie', indexRouter);
// app.use('/users', usersRouter);


mongoose.connect("/mongodb://localhost:27017/VideoClubOnline", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('conectado a mongodb'))
    .catch((error) => console.log('Error al conectar a MongoDB ' + error));

app.get("/movie", (req, res) => {
    MovieModel.find({})
        .then(movies => res.send(movies))
        .catch(error => console.log(error))

})
 ////////////////////////MOVIE//////////////////////////////
app.get("/movie/id/:id", (req, res) => {
    let id = req.params.id;
    console.log(id)
    MovieModel.findById(id, (err, movie) => {
        if (err) {
            console.log("ha habido un error")
            return res.status(500).send({
                mesaje: err
            })
        }
        if (!id) {
            console.log("no lo encuentra")
            return res.status(500).send({
                mesaje: "movie doesn't exist"
            })
        }
        console.log("la pelicula es" + movie)
        res.send(movie)
    })
})
app.get("/movie/title/:title", (req, res) => {

    let title = new RegExp(req.params.title, "i");

    MovieModel.find({
        title: title
    }, (err, movie) => {
        if (err) {
            console.log("ha habido un error " + err)
            return res.status(500).send({
                mesaje: err
            })
        }
        if (!title) {
            console.log("no lo encuentra")
            return res.status(500).send({
                mesaje: "movie doesn't exist"
            })
        }
        console.log("la pelicula es" + movie)
        res.send(movie)
    })
})
//Consultas a la base de datos para filtrar por genero
app.get("/movie/genre/:genre", (req, res) => {

    genre = new RegExp(req.params.genre, "i")

    GenreModel.find({
        name: genre
    }, (err, docs) => {
        if (err) {
            console.log("ha habido un error " + err)
            return res.status(500).send({
                mesaje: err
            })
        }
        if (!genre) {
            console.log("no lo encuentra")
            return res.status(500).send({
                mesaje: "genre doesn't exist"
            })

        }
        //se recorre la coleccion de objetos genero y se almacena el id del genero que cuyo campo 
        //nombre coincida con el parametro pasado al controlador get
        let movieGenre = docs
        console.log(movieGenre)
        // for (let i = 0; i < movieGenre.length; i++) {
        //     console.log(movieGenre[i].id)

        //     if (movieGenre[i].name == genre) {

        //         var genreId = movieGenre[i].id
        //         console.log(genreId)
        //     }
        // }
        console.log('1 '+movieGenre)
        const movieGenreId=parseInt(movieGenre[0].id)
        
        MovieModel.find({
            genre_ids: movieGenreId
        }, (err, movie) => {
            console.log('2 '+movieGenreId)
            if(err){
                console.log("la has cagado "+ err)
            }
            if(!movieGenreId){
               
                console.log("hola")
                
                return console.log("No existe ningun genero con ese id")
            }
            console.log(movie)
            res.send(movie)
        })

    })
})
 ////////////////////////USER//////////////////////////////
app.post('/user/register',(req,res) =>{
  
    let newUser = new UserModel()
            newUser.username = req.body.username,
            newUser.password = req.body.password
        
        newUser.save((err,userSaved)=>{
            if(err){
                console.log("Ha habido un error al guardar los datos")
                return res.send(err)
            }
            res.send(userSaved)
            console.log(userSaved + " ha sido guardado correctamente")
        })
        
    })
    


   

app.listen(3001, () => console.log("Servidor levantado en el puerto 3001"));

module.exports = app;