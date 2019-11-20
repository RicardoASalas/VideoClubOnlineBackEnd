const MovieModel = require ('../models/Movie')

exports.function = (req, res) => {

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
  }