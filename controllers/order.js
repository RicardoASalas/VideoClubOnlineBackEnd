const ObjectId = require('mongodb').ObjectID;
const MovieModel = require ('../models/Movie')
const UserModel = require('../models/User');

exports.function = (req, res) => {
    
    let filmId = ObjectId(req.body.id);

    const insertedToken = ObjectId(req.headers.authorization)
    
    
  
        MovieModel.find({
            _id: filmId
        }, (err, movie) => {
            if (err) {
                return res.send('Ha habido un error'+err)
            }
            if (!movie[0]) {
                return res.send('La pelicula introducida no existe en la base de datos')
            }
            console.log(movie)
            const movieSearched = movie[0];
            console.log(movie[0])
            const currentDate = new Date()
            const currentRentingDate = currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()
            const objectFilmRented = {

                movieRentedId: movieSearched._id, 

                movieRentedTitle: movieSearched.title, 

                rentingDate: currentRentingDate,

            }

            UserModel.find( {token: insertedToken} ,(err, userValidDocument) => {
                 userValid = userValidDocument[0]
                
                if (err) {
          
                    return res.send(' Ha habido un error '+err)
                }
          
                if (userValid.filmRented !== "") {
                    
                    return res.send({mensaje: 'El usuario ya tiene una pelicula alquilada: '})
                }
                
                 userValid.filmRented = movieSearched.title
                 userValid.filmId = movieSearched._id
                 userValid.numberRentingDays = req.body.numberRentingDays
                 userValid.payingAmount = req.body.payingAmount
                 userValid.rentingDate = currentRentingDate
           
                 const tiempoTransporte = 2
                 userValid.arrivalDate = (currentDate.getDate()+tiempoTransporte)+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()
            
                 userValid.save((err, saved) => {
                     if (err){
                         return res.status(500).send('Ha habido un error al salvar'+err)
                     }
                      res.status(200).send({mensaje: `Pelicula ${movieSearched.title} alquilada con exito`})
                    })
                
                    UserModel.findByIdAndUpdate(userValid._id,{$push:{ viewedFilms: objectFilmRented}}, (err, historic) =>{
                        if(err){
                            return res.status(400).send(err)
                        }
                    } )
      
        })
        // .select('username filmRented rentingDate arrivalDate')
    })
        
  
  }
  