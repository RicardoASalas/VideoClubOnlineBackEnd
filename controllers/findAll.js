const MovieModel = require ('../models/Movie')

exports.function = (req, res) => {
    MovieModel.find({})
        .then(movies => res.send(movies))
        .catch(error => res.send(error))
  
  }