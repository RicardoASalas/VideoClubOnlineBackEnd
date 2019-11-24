const MovieModel = require('../models/Movie');

exports.function = (req, res) => {

    const movieTitle = req.body.title;

    MovieModel.findOneAndDelete({title: movieTitle},(err, movieFounded) => {
        if(err){
            return res.send('Ha abido un error: '+err)
        }
        if(!movieFounded){
            
            return res.send('La pelicula introducida no se encuentra en la base de datos')

        }
       
        res.send('La pelicula ha sido eliminada con éxito.')
    })
  
  }