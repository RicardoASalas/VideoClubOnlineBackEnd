const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const mongoose = require('mongoose');
const MovieModel = require('./models/Movie');
const GenreModel = require('./models/Genre');
const UserModel = require('./models/User');
const TokenModel = require('./models/token');

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

 //endpoint que consulta a la base de datos y busca peliculas por id
app.get("/movie/id/:id", (req, res) => {
    let id = req.params.id;

    MovieModel.findById(id, (err, movie) => {
        if (err) {
            return res.send("Ha habido un error: "+err)
        }
        if (!id) {
        
            return res.send("No existe ninguna pelicula con ese id")
        }
        res.send(movie)
    })
})

//endpoint de busqueda de peliculas por medio del tìtulo
app.get("/movie/title/:title", (req, res) => {

    let title = new RegExp(req.params.title, "i");

    MovieModel.find({
        title: title
    }, (err, movie) => {
        if (err) {

            return res.send("Ha habido un error: "+err)
        }
        if (!title) {

            return res.send("No se encuentra ninguna pelìcula con ese nombre.")
        }
        res.send(movie)
    })
})
//endpoint que consulta a la base de datos para filtrar por genero mediante un
//regex generado a partir del genero introducido en el body
//y la bandera i para ignorar mayúsculas
app.get("/movie/genre/:genre", (req, res) => {

    genre = new RegExp(req.params.genre, "i")

    GenreModel.find({
        name: genre
    }, (err, movie) => {
        if (err) {
            
            return res.send("Ha habido un error al guardar los datos: "+err)
        }
        if (!genre) {
            
            return res.send("El genero introducido no es valido.")

        }
        
        movieGenre = movie
        movieGenreId=parseInt(movieGenre[0].id)
        
        MovieModel.find({
            genre_ids: movieGenreId
        }, (err, movie) => {
            if(err){
                return res.send("Ha habido un error en la busqueda: "+ err)
            }
            if(!movieGenreId){
               
                
                return res.send("No existe ningun genero con ese id")
            }
            res.send(movie)
        })

    })
})
 ////////////////////////USER//////////////////////////////

 //end point para registrarse y crear usuarios en la base de datos
app.post('/user/register',(req,res) =>{
  
    let newUser = new UserModel()
            newUser.username = req.body.username,
            newUser.password = req.body.password
        
        newUser.save((err,userSaved)=>{
            if(err){

                return res.send("Ha habido un error al guardar los datos: "+err)
            }
            res.send(userSaved+ " ha sido guardado correctamente")

        })
        
    })

//End point para logearse con un usuario y contraseña. en caso 
//el usuario y contraseña existan y sean validos creara un token
//para ese usuario.
app.post('/user/login', (req, res)=>{
    userExist = req.body.username;
    passwordIsValid = req.body.password;
    
    UserModel.find({username: userExist}, (err, userValid)=>{
        if (err){
            return res.send("Error. "+err)
        }
        if(!userValid.length){
            return res.send("el usuario no existe")
        }
        if(userValid[0].password !==passwordIsValid){
            return res.send("la contraseña no es correcta")
        }
        
        token = new TokenModel()
        token.userId = userValid[0]._id;
        token.save()
        res.send("login realizado con exito")
        
    })
    
})

    


   

app.listen(3001, () => console.log("Servidor levantado en el puerto 3001"));

module.exports = app;