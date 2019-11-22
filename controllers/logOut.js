const UserModel = require('../models/User');
const TokenModel = require('../models/token');

exports.function = (req, res) => {
    
    const insertedToken = ObjectId(req.headers.authorization)
    UserModel.find({
        token: insertedToken}, (err, validUser) => {
        if (err) {
            console.log("ha habido un error")
            return res.send("Ha habido un error: " + err)
        }
        if (!validUser.length) {
            console.log(validUser)
            return res.send("El usuario no existe.")
        }
        if (!validUser[0].login) {
            return res.send("Este usuario no esta logeado.")
        }
        userToken = validUser[0].token
        validUser[0].login = false
        validUser[0].token = null
        validUser[0].save()
  
        TokenModel.findByIdAndDelete(userToken, (err, tokenRemoved) => {
            if (err) {
                return res.send('Ha habido un error' + err)
            }
            tokenRemoved.remove();
        })
  
        res.send('El usuario se ha deslogeado con exito')
    })
  
  }