const MovieModel = require ('../models/Movie')
const GenreModel = require ('../models/Genre')

exports.function = (req, res) => {

    const genre = new RegExp(req.params.genre, "i")
    
    GenreModel.find({name: genre})
    .then(gen=>{
        if(!gen[0]){
  
            return res.status(400).send("El genero introducido no es valido.")
        }
        const movieGenre = gen[0]
  
        const movieGenreId = parseInt(movieGenre.id)
       
        MovieModel.find({genre_ids: movieGenreId})
        .then(movie=>{
            if (!movie[0]){
                return send.status(400).send('No se han encontrado peliculas de ese genero')
            }
            res.status(200).send(movie)
        })
        .catch(err=> res.status(500).send('Ha habido un error'+ err))    
      
    })
    .catch(err=> res.status(500).send('Ha habido un error '+err))
  
       
  }