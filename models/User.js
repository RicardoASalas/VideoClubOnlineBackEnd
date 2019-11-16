const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    token: String,
    
    username:{
        type: String,
        unique: true,
        required: true
    },

    password:{
        type: String,
        require: true
    }
})

const UserModel = mongoose.model('user', UserSchema);
module.exports=UserModel;