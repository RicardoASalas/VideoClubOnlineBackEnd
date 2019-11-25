const ObjectId = require('mongodb').ObjectID;
const UserModel = require('../models/User');


exports.function = (req, res) => {

    const insertedToken = ObjectId(req.headers.authorization)
    UserModel.find({
        token: insertedToken
    }, (err, userValid) => {
        if (err) {
  
            return res.send('Ha habido un error'+err)
        }
  
        if (!userValid[0]) {
  
            return res.send('No se ha encontrado el usuario en la base de datos')
  
        }
        if (userValid[0].filmRented !== "") {

            userValid[0].viewedFilms.pop();
            userValid[0].filmRented = ""
            userValid[0].rentingDate = ""
            userValid[0].arrivalDate = ""
            userValid[0].numberRentingDays= ""
    
            userValid[0].save((err, cancelSaved)=>{
                if(err){
                    return res.send("Ha habido un error al cancelar "+err)
                }
                 res.send('El pedido ha sido cancelado con exito'+cancelSaved)
            });
            
        }
    })
  }

