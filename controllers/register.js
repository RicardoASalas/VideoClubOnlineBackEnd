const UserModel = require('../models/User');

exports.function = (req, res) => {


    UserModel.findOne({}, (error, userExists) => {
        let firstAdminExists = false
        if (error) {
            return console.log(error)
            
        }
        if(userExists == null ){
            console.log(userExists)
            firstAdminExists = true;
        }
        
        const newUser = new UserModel()

        newUser.username = req.body.username
        newUser.password = req.body.password
        newUser.email = req.body.email
        newUser.login = false
        newUser.filmRented = ""
        newUser.rentingDate = null
        newUser.arrivalDate = null
        newUser.admin = firstAdminExists


        newUser.save((err, userSaved) => {
            if (err) {

                return res.status(400).send("El usuario o email introducido ya existen: "+err)
            }
            res.status(200).send(userSaved + " ha sido guardado correctamente")

        })
    })

}