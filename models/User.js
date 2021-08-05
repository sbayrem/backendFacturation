const mongoose = require('mongoose');
uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    nom : {type:String,required:true},
    prenom : {type:String,required:true},
    matricule : {type:String,required:true,unique:true},
    password : {type:String,required:true,select : false},
    isActive : {type:Boolean,required:true}
});

userSchema.plugin(uniqueValidator) ;
module.exports = mongoose.model('User',userSchema);