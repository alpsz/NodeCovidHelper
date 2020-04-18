const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients_controller');

//creating the route to register the patient
router.post('/register',patientController.register);

//creating the route for generate patient's report
router.post('/:id/create_report',patientController.createReport);

//creating the route to find all the reports of a specific patient
router.post('/:id/all_reports',patientController.allReports);

module.exports = router;