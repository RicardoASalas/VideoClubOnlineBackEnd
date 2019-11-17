UserModel = require('../models/User')
TokenModel = require('../models/token')
mongoose = require('mongoose')

function isAuth (req, res, next){

    const autorizacion = req.headers.authorization;
    console.log('la autorizacion es ' +autorizacion)
    
    const userExist = req.body.username

    const valiPassword = req.body.password
    console.log(req.body)

    if (!autorizacion){
        return res.send("necesitas autorizacion")
    }
    UserModel.find({username:userExist, password: valiPassword}, (err, userValid)=>{
        if(err){
            return res.send('Ha habido un error '+err)
        }
        if (!userValid){
            return res.send('EL usuario introducido no existe o el password no es valido.')
        }
        if (!userValid[0].login){
            return res.send('el usuario no esta logeado')
        }
        
        const userValidToken = userValid[0].token
        const userToken=userValidToken.toString()
    
        console.log(autorizacion+'   '+userToken)
        if(userToken !== autorizacion){
            return res.send('El token introducido no es valido')
        }
        
        
        next()        

    })
    
   
}

module.exports = isAuth

