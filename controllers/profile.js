const UserModel = require('../models/User');
const TokenModel = require('../models/token');


exports.function = (req, res) => {

    const insertedToken = ObjectId(req.headers.authorization)
    UserModel.find({
        token: insertedToken
    }, (err, userValid) => {
        if (err) {
  
            return res.send('Ha habido un error')
        }
  
        if (!userValid[0]) {
  
            return res.send({mensaje: 'No se ha encontrado el usuario en la base de datos'})
  
        }
  
        res.send(userValid[0])
  
    }).select('username filmRented rentingDate arrivalDate viewedFilms numberRentingDays payingAmount admin')
  
  }