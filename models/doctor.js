const mongoose = require('mongoose');

//creating the schema for the doctor 
const doctorSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required :true
    }

},{
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

//exporting doctor's schema
module.exports = Doctor;