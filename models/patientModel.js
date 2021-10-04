const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    number: String,
    gender: String,
    city: String,
    country: String,
    dob: String,
    applicationNumber: String,
    time: String,
    symptoms: [String],
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;