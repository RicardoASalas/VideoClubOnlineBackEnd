const UserModel = require('../models/User');
const TokenModel = require('../models/token');

exports.function = (req, res) => {
    const userExist = req.body.username;
    const passwordIsValid = req.body.password;
  
    UserModel.find({
        username: userExist
    }, (err, validUser) => {
        if (err) {
            return res.status(500).send("Error. " + err)
        }
        if (!validUser.length) {
            return res.status(200).send({mensaje:"El usuario introducido no existe"})
        }
        if (validUser[0].password !== passwordIsValid) {
            return res.status(200).send({mensaje:"La contraseña introducida no es correcta"})
        }
  
        if (validUser[0].login) {
  
            return res.status(200).send("Este usuario ya esta logeado.")
        }
  
        token = new TokenModel()
        token.userId = validUser[0]._id
        token.save()
        validUser[0].token = token._id
        validUser[0].login = true
        validUser[0].save()
        respuestaToken = validUser[0].token.toString()
        res.status(200).send({token: respuestaToken })
  
    })
  
  }