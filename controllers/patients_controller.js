const Pateint = require('../models/patient');
const Doctor = require('../models/doctor');
const Report = require('../models/report');
var jwt = require('jsonwebtoken');

//create the patients profile
module.exports.register = function (req, res) {
    try {
        //find patient if available then return all the details
        Pateint.findOne({ phone: req.body.phone }, function (err, patient) {
            if (!patient) {
                //if the patient is not registered then create its profile
                Pateint.create(req.body, function (err, user) {
                    if (err) {
                        return res.json(422, {
                            err: err,
                            message: "Error while registering doctor's detail"
                        });
                    }

                    return res.json(200, {
                        message: "Registration successfull"

                    })



                });
            } else {
                return res.json(200, {
                    message:"Patient Already Registered",
                    patient_info: patient

                })
            }
        });
    } catch (err) {
        return res.json(500, {
            message: "Internal server error"
        });
    }
}

//creating patient's report
module.exports.createReport = function(req,res){
    try{
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        //fetch auth token from the header and decode it using jwt secret key 
        jwt.verify(token, 'covid19', function(err, decoded) {
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          
          //find the doctor's name from the auth token and assign it to patient's report
          Doctor.findById(decoded._id, function (err, doctor) {
            if (err) return res.status(500).send("Your Session Expired.");
            if (!doctor) return res.status(404).send("No such doctor found");
            //creating the report
            Report.create({
                patient:req.params.id,
                doctor:doctor.username,
                status:'Positive-Admit',
                date: new Date(),
            }, function (err, user) {
                if (err) {
                    return res.json(422, {
                        err: err,
                        message: "Error while creating pateint's report"
                    });
                }

                return res.json(200, {
                    message: "Report created successfully"

                })



            });

          });
        });
    }catch (err) {
        return res.json(500, {
            message: "Internal server error"
        });
    }
}



//creating all the reports of a specific pateint and displaying them based on the date of creation 
module.exports.allReports = function(req,res){
    try{
        Report.find({ patient: req.params.id}).sort({date: 'desc'}).exec(function(err, reports) {  
            return res.json(200,{
            all_reports:reports
        });});
    }catch (err) {
        return res.json(500, {
            message: "Internal server error"
        });
    }
}
