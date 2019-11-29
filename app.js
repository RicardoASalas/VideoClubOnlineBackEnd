const express = require('express');
const mongoose = require('mongoose');
const movieRouter = require('./routers/movies');
const userRouter = require('./routers/users');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
    next();
});

mongoose.connect("/mongodb://localhost:27017/VideoClubOnline", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('conectado a mongodb'))
    .catch((error) => console.log('Error al conectar a MongoDB ' + error));


////////////////////////MOVIE//////////////////////////////

app.use('/movie', movieRouter)

////////////////////////USER//////////////////////////////

app.use('/user', userRouter)


app.listen(3001, () => console.log("Servidor levantado en el puerto 3001"));

module.exports = app;