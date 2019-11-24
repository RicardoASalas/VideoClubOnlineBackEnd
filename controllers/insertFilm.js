const MovieModel = require('../models/Movie');

exports.function = (req, res) => {
    console.log(req.body)    
    MovieModel.find({title: req.body.title}, (error, moviefounded)=>{
        if (error){

            return res.send('Ha habido un error: '+error)

        }
        if(moviefounded[0]){

            console.log(moviefounded)
            return res.send('La película ya se encuentra en la base de datos')

        }
        const newFilm = new MovieModel

        newFilm.original_title = req.body.original_title
        newFilm.poster_path =  req.body.poster_path
        newFilm.id = req.body.id
        newFilm.genre_ids = req.body.genre_ids
        newFilm.title = req.body.title
        newFilm.release_date = req.body.release_date
        console.log (newFilm.original_title+" "+newFilm.poster_path+" "+newFilm.id+" "+newFilm.genre_ids+" "+newFilm.title)

        newFilm.save((error, filmSaved) =>{
            if (error){
                return res.send("Ha habido un error al guardar la pelicula en la base de datos: "+error)
            }
            if (filmSaved){
                res.send("La pelicula "+newFilm.title+" ha sido guardada con exito en la base de datos")
            }
        })

    })
  
  }