const express = require('express');
const mongoose = require('mongoose');
const movieRouter = require('./routers/movies');
const userRouter = require('./routers/users');

const app = express();
app.use(express.json());

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