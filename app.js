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

//endpoint que saca una relacion de todas las peliculas de la base de datos
app.get("/movie", (req, res) => {
    MovieModel.find({})
        .then(movies => res.send(movies))
        .catch(error => res.send(error))

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
    
            newUser.username = req.body.username
            newUser.password = req.body.password
            newUser.login = false
        
        newUser.save((err,userSaved)=>{
            if(err){

                return res.send("El usuario introducido ya existe")
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
    
    UserModel.find({username: userExist}, (err, validUser)=>{
        if (err){
            return res.send("Error. "+err)
        }
        if(!validUser.length){
            return res.send("El usuario introducido no existe")
        }
        if(validUser[0].password !==passwordIsValid){
            return res.send("La contraseña introducida no es correcta")
        }
    
        if(validUser[0].login ){

            return res.send("Este usuario ya esta logeado.")
        }
        
        token = new TokenModel()
        token.userId = validUser[0]._id
        token.save()
        validUser[0].token=token._id
        validUser[0].login=true
        validUser[0].save()

        
        console.log(validUser[0])
        
        res.send("Login de "+validUser[0].username+" realizado con exito")
        
    })
    
})

//endpoint que valida el token y permite visualizar el perfil
app.get('/user/profile',(req,res)=>{

})

//endpoint que realiza el log out y borra el token del usuario
app.patch('/user/logout', (req,res)=>{
    userExist=req.body.username
    UserModel.find({username:validUser},(err,validUser)=>{
        if(err){
            return res.send("Ha habido un error: "+err)
        }
        if(!validUser.length){
            return res.send("El usuario no existe.")
        }
        if(!validUser[0].token){
            return res.send("Este usuario no esta logeado.")
        }
        userToken=validUser[0].token
        TokenModel.findByIdAndDelete(userToken)
    })

})

    


   

app.listen(3001, () => console.log("Servidor levantado en el puerto 3001"));

module.exports = app;