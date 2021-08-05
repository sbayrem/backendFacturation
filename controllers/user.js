const bcrypt = require('bcrypt');
const User = require('../models/User');


exports.createUser = (req,res,next)=>{
bcrypt.hash(req.body.password,10)
.then( hash => {
    const user = new User({
        nom:req.body.nom,
        prenom:req.body.prenom,
        matricule:req.body.matricule,
        password:hash,
        isActive:req.body.isActive
    });
    user.save()
    .then(() => res.status(201).json({message : 'Utilisateur créé !' , response : 'success'}))
    .catch(error =>res.status(400).json({error}));
})
.catch(error =>res.status(500).json({error}));
};





exports.login=(req,res,next) =>{
 User.findOne({ matricule : req.body.matricule})
 .then(user=>{
     if(!user){
         return res.status(401).json({error : 'Utilisateur non trouvé'});
     }
     bcrypt.compare(req.body.password,user.password)
     .then(valid =>{
      if(!valid){
        return res.status(401).json({error : 'Mot de passe incorrect !'});
      }
     res.status(200).json({
         userId : user._id,
         token : 'TOKEN'
     });

     })
     .catch(error => res.status(500).json({error}));
 })
 .catch(error => res.status(500).json({error}));
};

exports.modifyUser=(req,res,next)=>{

console.log("*"+req.body.password+"*") ; 


    if (req.body.password==='undefined' || req.body.password  === null || req.body.password  === '' || req.body.password  === undefined){
      
        User.updateOne({matricule:req.body.matricule},{...req.body})
        .then(()=> res.status(200).json({message:'Utilisateur modifié'}))
        .catch(error=>res.status(400).json({error}));
    }
    else
    {
    
        bcrypt.hash(req.body.password,10)
        .then(hash=>{ 
            console.log(hash);
        User.updateOne({matricule : req.body.matricule},{...req.body ,  password : hash}) 
        .then(()=> res.status(200).json({message:'Utilisateur modifié'}))
        .catch(error=>res.status(400).json({error}));
        });      

    }



};

exports.getUserByMatricule = (req,res,next)=>{

User.findOne({matricule : req.params.matricule})
.then(user =>res.status(200).json(user))
.catch(error=>res.status(404).json({error}));

};

exports.getAllUsers =(req,res,next)=>{
    User.find()
    .then(Users => res.status(200).json(Users))
    .catch(error => res.status(400).json({error}));
};

exports.deleteUser = (req,res,next)=>{
User.deleteOne({matricule:req.params.matricule})
.then(user => res.status(200).json({message : 'Object supprimé !'}))
.catch(error => res.status(404).json({error}));
};