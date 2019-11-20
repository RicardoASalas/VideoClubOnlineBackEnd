const express = require ('express');
const router = express.Router ();

const find_all = require ('../controllers/findAll')
const find_by_id = require ('../controllers/findById')
const find_by_title = require ('../controllers/findByTitle')
const find_by_genre = require ('../controllers/findByGenre')


/* GET home page. */

//endpoint que saca una relacion de todas las peliculas de la base de datos
router.get("/", find_all.function )

// endpoint que consulta a la base de datos y busca peliculas por id
router.get("/id/:id", find_by_id.function)

//endpoint de busqueda de peliculas por medio del tìtulo
router.get("/title/:title", find_by_title.function )

//endpoint que consulta a la base de datos para filtrar por genero mediante un
//regex generado a partir del genero introducido en el body
//y la bandera i para ignorar mayúsculas
router.get("/genre/:genre", find_by_genre.function )


module.exports = router;
