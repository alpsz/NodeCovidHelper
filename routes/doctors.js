const express = require('express');
const router = express.Router();
//import doctors controller
const doctorController = require('../controllers/doctors_controller');

//creating a route to register the doctor 
router.post('/register',doctorController.register);

//creating a route to login the doctor 
router.post('/login',doctorController.login);
 

module.exports = router;