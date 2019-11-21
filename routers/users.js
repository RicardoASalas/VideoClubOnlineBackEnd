var express = require('express');
var router = express.Router();

const authorization = require('../middlewares/authorization');

const register = require ('../controllers/register');
const login = require ('../controllers/logIn');
const profile = require ('../controllers/profile');
const logout = require ('../controllers/logOut');
const order = require ('../controllers/order');
const cancelOrder = require ('../controllers/cancelOrder');
const viewed = require('../controllers/viewed');



/* GET users listing. */
//end point para registrarse y crear usuarios en la base de datos
router.post('/register', register.function);

//End point para logearse con un usuario y contraseña. en caso 
//el usuario y contraseña existan y sean validos creara un token
//para ese usuario.
router.patch('/login', login.function);

//endpoint que valida el token y permite visualizar el perfil
router.get('/profile', authorization, profile.function );

//endpoint que realiza el log out y borra el token del usuario
router.patch('/logout', logout.function);

////////////////////////PEDIDOS//////////////////////////////

//endpoint que introduce el nombre y la id de la pelicula alquilada y genera las fechas de alquiler y llegada a domicilio

router.patch('/profile/order', authorization, order.function);

//endpoint que permite cancelar el pedido por parte del usuario 

router.patch('/profile/order/cancel', authorization, cancelOrder.function);

//endpoint que permite visualizar todas las peliculas que se han alquilado 

router.get('/profile/viewed', authorization, viewed.function);

module.exports = router;
