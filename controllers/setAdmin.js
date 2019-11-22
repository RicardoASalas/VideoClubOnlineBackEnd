const UserModel = require('../models/User');

exports.function = (req, res) => {

    const userName = req.body.username;

    UserModel.find({username: userName},(err, userFounded) => {
        if(err){
            return res.send('Ha abido un error: '+err)
        }

        userFounded[0].admin = true
        userFounded[0].save((err, userSaved) =>{
            if(err){
                return res.send('Ha habido un error al salvar: '+err)
            }
            res.send('Al usuario '+userFounded[0].username+' se le han dado permisos de administrador.')
        }) 
    })
  
  }