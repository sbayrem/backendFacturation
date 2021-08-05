const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/createUser',userCtrl.createUser);
router.post('/login',userCtrl.login);
router.get('/getAllUsers',userCtrl.getAllUsers);
router.get('/getUserByMatricule/:matricule',userCtrl.getUserByMatricule);
router.put('/modifyUser/:matricule',userCtrl.modifyUser);
router.delete('/deleteUser/:matricule',userCtrl.deleteUser);


module.exports = router ;