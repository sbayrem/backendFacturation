const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

const userRoutes = require('./routes/user');
 //const DB_URI = "mongo://mongo:27017/facturation"
const DB_URI = "mongodb://admin:admin@172.17.0.10:27017/facturation"

mongoose.connect(DB_URI , {useNewUrlParser:true ,useUnifiedTopology:true})
.then(()=> console.log('Connection à MongoDB réussie'))
.catch(()=> console.log('Connection à MongoDB echouée !'));
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/api/auth',userRoutes)



module.exports = app ;