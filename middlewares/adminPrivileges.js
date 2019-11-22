UserModel = require('../models/User')
TokenModel = require('../models/token')
mongoose = require('mongoose')
ObjectId = require('mongodb').ObjectID;

function isAdmin (req, res, next){

    const autorizacion = req.headers.authorization;  
    const insertedToken = ObjectId(autorizacion)

    UserModel.find({token: insertedToken}, (err, userValid)=>{
        if(err){
            return res.send('Ha habido un error '+err)
        }
        if (!userValid[0].admin){
            return res.send('No tienes permisos de administrador')
        }
        
        next()        

    })
    
   
}

module.exports = isAdmin
