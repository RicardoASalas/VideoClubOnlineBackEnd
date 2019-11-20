const MovieModel = require ('../models/Movie')

exports.function = (req, res) => {
    const id = req.params.id;
  
    MovieModel.findById(id)
    .then(movie=>{
    
        if(!movie){
            return res.status(400).send("No existe ninguna pelicula con ese id")
        }
        res.status(200).send(movie)
    })
    .catch(err=> res.status(500).send("Ha habido un error: " + err))
  }
  