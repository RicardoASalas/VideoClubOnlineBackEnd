const ObjectId = require('mongodb').ObjectID;
const MovieModel = require ('../models/Movie')
const UserModel = require('../models/User');

exports.function = (req, res) => {

    let title = new RegExp(req.body.title, "i");
  
    const insertedToken = ObjectId(req.headers.authorization)
    UserModel.find({
        token: insertedToken
    }, (err, userValid) => {
        if (err) {
  
            return res.send('Ha habido un error')
        }
  
        if (!userValid[0]) {
  
            return res.send('No se ha encontrado el usuario en la base de datos')
  
        }
        
        res.status(200).send('Peliculas alquiladas'+userValid[0].viewedFilms)
  
    })
  
  }