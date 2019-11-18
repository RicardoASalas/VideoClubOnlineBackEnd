UserModel = require('../models/User')
TokenModel = require('../models/token')
mongoose = require('mongoose')
ObjectId = require('mongodb').ObjectID;

function isAuth (req, res, next){

    const autorizacion = req.headers.authorization;
    console.log('la autorizacion es ' +autorizacion)
    

    if (!autorizacion){
        return res.send("necesitas autorizacion")
    }
    if (autorizacion.split("").length !== 24){
    
        return res.send("El token no es valido")
    }
    const insertedToken = ObjectId(autorizacion)

    UserModel.find({token: insertedToken}, (err, userValid)=>{
        if(err){
            return res.send('Ha habido un error '+err)
        }
        if (!userValid[0]){
            return res.send('EL Token no es valido o ha expirado')
        }
        
        next()        

    })
    
   
}

module.exports = isAuth

