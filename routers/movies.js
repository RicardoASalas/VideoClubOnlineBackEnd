const express = require ('express');
const router = express.Router ();
const MovieModel = require ('../models/Movie')
const GenreModel = require ('../models/Genre')


/* GET home page. */
//endpoint que saca una relacion de todas las peliculas de la base de datos
router.get("/", (req, res) => {
  MovieModel.find({})
      .then(movies => res.send(movies))
      .catch(error => res.send(error))

})

// endpoint que consulta a la base de datos y busca peliculas por id
router.get("/id/:id", (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id)
  .then(movie=>{
  
      if(!movie){
          return res.status(400).send("No existe ninguna pelicula con ese id")
      }
      res.status(200).send(movie)
  })
  .catch(err=> res.status(500).send("Ha habido un error: " + err))
})

//endpoint de busqueda de peliculas por medio del tìtulo
router.get("/title/:title", (req, res) => {

  const title = new RegExp(req.params.title, "i");

  MovieModel.find({title: title})
  .then(movie=>{
      console.log(movie)
       if (!movie[0]) {
      
           return res.status(400).send("No se encuentra ninguna pelìcula con ese nombre.")
       }
       res.status(200).send(movie)
  })
  .catch(err=>res.status(500).send("Ha habido un error: " + err))
})

//endpoint que consulta a la base de datos para filtrar por genero mediante un
//regex generado a partir del genero introducido en el body
//y la bandera i para ignorar mayúsculas
router.get("/genre/:genre", (req, res) => {

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

     
})


module.exports = router;
