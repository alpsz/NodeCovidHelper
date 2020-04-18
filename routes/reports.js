const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reports_controller');

//creating a route to find all the reports based on status 
router.post('/:status',reportController.reports);

module.exports = router;