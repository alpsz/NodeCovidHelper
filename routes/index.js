const express = require('express');
const router = express.Router();

//setting up an intermediate route for doctors api
router.use('/doctors',require('./doctors'));

//setting up an intermediate route for patients api
router.use('/patients',require('./patients'));

//setting up an intermediate route for reports api
router.use('/reports',require('./reports'));


module.exports = router;