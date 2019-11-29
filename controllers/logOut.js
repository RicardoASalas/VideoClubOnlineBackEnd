const UserModel = require('../models/User');
const TokenModel = require('../models/token');

exports.function = (req, res) => {
    console.log("el token que llega es "+req.headers.authorization)
    const insertedToken = ObjectId(req.headers.authorization)
    console.log(insertedToken)
    UserModel.find({
        token: insertedToken}, (err, validUser) => {
        if (err) {
            console.log({mensaje: "ha habido un error"})
            return res.send({mensaje: "Ha habido un error: " + err})
        }
        if (!validUser.length) {
            console.log(validUser)
            return res.send({mensaje: "El usuario no existe."})
        }
        if (!validUser[0].login) {
            return res.send({mensaje: "Este usuario no esta logeado."})
        }
        userToken = validUser[0].token
        validUser[0].login = false
        validUser[0].token = null
        validUser[0].save()

  
        TokenModel.findByIdAndDelete(userToken, (err, tokenRemoved) => {
            if (err) {
                return res.send({mensaje: 'Ha habido un error' + err})
            }
            tokenRemoved.remove();
        })
  
        res.send({mensaje: 'El usuario se ha deslogeado con exito'})
    })
  
  }