const mongoose=require('mongoose');

objectId=mongoose.Schema.ObjectId
const UserSchema=mongoose.Schema({
    
    token: objectId,

    username:{
        type: String,
        unique: true,
        required: true
    },

    password:{
        type: String,
        require: true
    },

    email:{
        type: String,
        require: true,
        unique: true,
    },

    admin: Boolean,

    login: Boolean,
    
    filmId: objectId,

    filmRented: String,

    rentingDate: String,

    arrivalDate: String,

    numberRentingDays: String,

    payingAmount: String,

    viewedFilms:[{
        
        movieRentedId: String,

        movieRentedTitle: String,

        rentingDate: String,

    }]  

})

const UserModel = mongoose.model('user', UserSchema);
module.exports=UserModel;