const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const mongoose = require ('mongoose');
const MovieModel = require('./models/Movie');
const GenreModel = require('./models/Genre');

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


mongoose.connect("/mongodb://localhost:27017/VideoClubOnline",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
    .then(() => console.log('conectado a mongodb'))
    .catch((error) => console.log('Error al conectar a MongoDB ' + error));

app.get("/movie",(req, res)=>{
    MovieModel.find({})
    .then(movies => res.send(movies))
    .catch(error => console.log(error))
    
})

app.get("/movie/id/:id",(req, res)=>{
    let id=req.params.id;
    console.log(id)
    MovieModel.findById(id,(err,movie)=>{
    if(err){
        console.log("ha habido un error")
        return res.status(500).send({mesaje: err})
    }
    if(!id){
        console.log("no lo encuentra")
        return res.status(500).send({mesaje: "movie doesn't exist"})
    }
    console.log("la pelicula es" + movie)
    res.send(movie)
    })
})
app.get("/movie/title/:title",(req, res)=>{

    let title= new RegExp(req.params.title, "i");

    MovieModel.find({title:title},(err,movie)=>{
    if(err){
        console.log("ha habido un error "+err)
        return res.status(500).send({mesaje: err})
    }
    if(!title){
        console.log("no lo encuentra")
        return res.status(500).send({mesaje: "movie doesn't exist"})
    }
    console.log("la pelicula es" + movie)
    res.send(movie)
    })
})

app.get("/movie/genre/:genre",(req,res)=>{

    genre= new RegExp(req.params.genre,"i")
    var genreId=""
    
    GenreModel.find({name:genre},(err,docs)=>{
    if(err){
        console.log("ha habido un error "+err)
        return res.status(500).send({mesaje:err})
    }
    if(!genre){
        console.log("no lo encuentra")
        return res.status(500).send({mesaje: "genre doesn't exist"})

    }
    
    let movieGenre=docs
    
    for(let i=0;i<movieGenre.length;i++){
      console.log(movieGenre[i].id)
      
        if (movieGenre[i].name == genre){
        
             genreId=movieGenre[i].id
        }
    }

    
    
    })
    
        console.log(genre_ids)
        MovieModel.find({genre_ids[0]:genreid},(err,movies)=>{
            res.send(movies)
        } )



    
})

app.listen(3001, ()=>console.log( "Servidor levantado en el puerto 3001"));

module.exports = app;
