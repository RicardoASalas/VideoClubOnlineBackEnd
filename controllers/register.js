const UserModel = require('../models/User');

exports.function = (req, res) => {


    UserModel.findOne({}, (error, userExists) => {
        let firstAdminExists = false
        validMail = /.+\@.+\..+/
        longitudPassword = /.{8,}/
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

        if(!validMail.test(req.body.email)){

            return res.send({mensaje: "El email introducido no es un email válido."})

        }
        if(!longitudPassword.test(req.body.password)){

            return res.send({mensaje: "El password debe contener al menos 8 caractéres o números."})

        }

        newUser.save((err, userSaved) => {
            if (err) {

                return res.status(400).send({mensaje: "El usuario o email introducido ya existen"})
            }
            res.status(200).send({mensaje: "El usuario ha sido guardado correctamente"})

        })
    })

}