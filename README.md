#### API rest RetroNetflix

Este codigo se corresponde a la API Rest de una app web con la que se pueden alquilar peliculas online. Como es una app inspirada en la antigua plataforma de Netflix, las peliculas alquiladas llegan al cliente por paqueteria y en formato DVD. Esta API tiene los enPoints necesarios para hacer peticiones a una base de datos creada en Mongo Db, en la que se podran almacenar los datos de Películas, dar de alta usuarios, logearse y deslogearse asi como crear users con privilegios de administrador que podran manipular la coleccion de películas de la base de datos.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

Para correr la app, necesitas tener instalado Visual Estudio Code u otro IDE de desarrollo que sea compatible con Java Script, Node js, Express, la extensión de Visual Estudio Rest Client para hacer uso del fichero de test de peticiones API rest, asi como Mongo DB.

```

```

### Instalación 🔧

En este repositorio solo se encuentra la API rest, por lo tanto no necesita instalacion, se puede correr desde Node JS ejecutando en una terminal "npm start", con el fichero API.rest se pueden probar las peticiones a los empoints y las respuestas, si no se tiene isntalada la extensión Rest Client de Visual Studio Code, también se puede usar la aplicación Postman.


Ejemplos de Peticiones a la API de RetroNetflix

```
GET http://localhost:3001/movie/id/5dcc325de4a8fd83e208c8c0
```

```
POST http://localhost:3001/user/register
Content-Type: application/json

{
    "username": "Maria",
    "password":"12345678",
    "email": "maria@gmail.com"
}
```

## Deployment 📦

El primer usuario que se registre en la base de datos tendrá por defecto privilegios de administrador, todos los que se creen a continuación tendran solo la capacidad de alquilar peliculas a no ser que un administrador le de acceso a los privilegios de admin. Para poder hacer consultas a las peliculas de la base de datos de Mongo será necesario crearla y añadir campos a traves del endpoint "insertFilm", ya que con la api no se suministra ninguna copia de la base de datos original que se uso para desarrollar la API.

## Construido con 🛠️

* [Java Script] - Lenguaje de Programación.
* [Visual Studio Code](https://code.visualstudio.com/download) - editor de código 
* [Node JS](https://nodejs.org/es/download/) - Entorno en tiempo de ejecución multiplataforma
* [Mongo DB](https://www.mongodb.com/download-center/community) - Base de datos no relacional
* [Express JS](Se instala con el gestor de paquetes de node (npd install express --save))- Marco de aplicación web para Node.js



## Autor ✒️


* **Ricardo Salas Vazquez** - *Trabajo Inicial y Documentacion* - [RicardoASalas](https://github.com/RicardoASalas)

## Licencia 📄

Este proyecto es de codigo abierto y de acceso libre para cualquier desarrollador o usuario que lo necesite.


