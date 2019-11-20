var express = require('express');
var router = express.Router();
const UserModel = require('../models/User');
const TokenModel = require('../models/token');
const authorization = require('../middlewares/authorization')
const ObjectId = require('mongodb').ObjectID;
const MovieModel = require ('../models/Movie')


/* GET users listing. */
//end point para registrarse y crear usuarios en la base de datos
router.post('/register', (req, res) => {
   
  const newUser = new UserModel()

  newUser.username = req.body.username
  newUser.password = req.body.password
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

})

//End point para logearse con un usuario y contraseña. en caso 
//el usuario y contraseña existan y sean validos creara un token
//para ese usuario.
router.patch('/login', (req, res) => {
  const userExist = req.body.username;
  const passwordIsValid = req.body.password;

  UserModel.find({
      username: userExist
  }, (err, validUser) => {
      if (err) {
          return res.status(500).send("Error. " + err)
      }
      if (!validUser.length) {
          return res.status(400).send("El usuario introducido no existe")
      }
      if (validUser[0].password !== passwordIsValid) {
          return res.status(400).send("La contraseña introducida no es correcta")
      }

      if (validUser[0].login) {

          return res.status(400).send("Este usuario ya esta logeado.")
      }

      token = new TokenModel()
      token.userId = validUser[0]._id
      token.save()
      validUser[0].token = token._id
      validUser[0].login = true
      validUser[0].save()
      respuestaToken = validUser[0].token.toString()
      res.status(200).send("Login de " + validUser[0].username + " realizado con exito. TOKEN: " + respuestaToken)

  })

})

//endpoint que valida el token y permite visualizar el perfil
router.get('/profile', authorization, (req, res) => {

  const insertedToken = ObjectId(req.headers.authorization)
  UserModel.find({
      token: insertedToken
  }, (err, userValid) => {
      if (err) {

          return res.send('Ha habido un error')
      }

      if (!userValid[0]) {

          return res.send('No se ha encontrado el usuario en la base de datos')

      }

      res.send(`Bienvenido ${userValid[0].username}, te has logeado con exito
           
           ${userValid[0]}`)

  }).select('username filmRented rentingDate arrivalDate')

})

//endpoint que realiza el log out y borra el token del usuario
router.patch('/logout', (req, res) => {
  const userExist = req.body.username
  UserModel.find({
      username: userExist
  }, (err, validUser) => {
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

})

////////////////////////PEDIDOS//////////////////////////////

//endpoint que introduce el nombre y la id de la pelicula alquilada y genera las fechas de alquiler y llegada a domicilio

router.patch('/profile/order', authorization, (req, res) => {

  let title = new RegExp(req.body.title, "i");

  const insertedToken = ObjectId(req.headers.authorization)
  UserModel.find({
      token: insertedToken
  }, (err, userValid) => {
      if (err) {

          return res.send('Ha habido un error')
      }

      if (!userValid[0]) {

          return res.send('No se ha encontrado el usuario en la base de datos')

      }
      if (userValid[0].filmRented !== "") {
          return res.send('El usuario ya tiene una pelicula alquilada')
      }

      MovieModel.find({
          title: title
      }, (err, movie) => {
          if (err) {
              return res.send('Ha habido un error'+err)
          }
          if (!title) {
              return res.send('La pelicula introducida no existe en la base de datos')
          }
          userValid[0].filmRented = movie[0].title
          userValid[0].filmId = movie[0]._id
          const currentDate = new Date()
          
          userValid[0].rentingDate = currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()
         
          const tiempoTransporte = 2
          userValid[0].arrivalDate = (currentDate.getDate()+tiempoTransporte)+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()
          
          userValid[0].save((err, saved)=>{
              if (err){
                  return res.send('Ha habido un error al salvar')
              }
               res.send('Salvado Correctamente'+saved)
          })
      })

  }).select('username filmRented rentingDate arrivalDate')

})


//endpoint que permite cancelar el pedido por parte del usuario 

router.patch('/profile/order/cancel', authorization, (req, res) => {

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
         
          userValid[0].filmRented = ""
          userValid[0].rentingDate = ""
          userValid[0].arrivalDate = ""
          userValid[0].save((err, cancelSaved)=>{
              if(err){
                  return res.send("Ha habido un error al cancelar "+err)
              }
               res.send('El pedido ha sido cancelado con exito')
          });
          
      }
  })
})

module.exports = router;
