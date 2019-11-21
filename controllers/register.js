const UserModel = require('../models/User');

exports.function = (req, res) => {
   
    const newUser = new UserModel()
  
    newUser.username = req.body.username
    newUser.password = req.body.password
    newUser.email = req.body.email
    newUser.login = false
    newUser.filmRented = ""
    newUser.rentingDate = null
    newUser.arrivalDate = null
  
    newUser.save((err,userSaved) => {
        if (err) {
  
            return res.status(400).send("El usuario introducido ya existe")
        }
        res.status(200).send(userSaved + " ha sido guardado correctamente")
  
    })
  
  }