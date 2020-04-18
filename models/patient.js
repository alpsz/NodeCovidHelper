const mongoose = require('mongoose');

//creating the schema for the patient
const patientSchema = new mongoose.Schema({
    phone: {
        type:String,
        required: true,
        unique: true
    }

},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

//exporting the patient's schema
module.exports = Patient;