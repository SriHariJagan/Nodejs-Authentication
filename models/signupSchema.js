const mongoose = require('mongoose');

const signup =new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true 
    },
    password : {
        type : String,
        require : true
    },
   confirmpassword : {
        type : String,
        require : true
    }
},{ timestamps: true });

const signupSchema = mongoose.model("signupSchema",signup);

module.exports = signupSchema;