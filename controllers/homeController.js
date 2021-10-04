const { v4: uuidv4 } = require('uuid');
const Patient = require('../models/patientModel');

const index = (req, res) => {
    Patient.find({},(err, found) => {
        if(!err && found) {
            res.render('index', {patients: found});
        } else {
            res.render('err', {error: err});
        }
    })
}

const newPatient = (req, res) => {
    res.render('addPatient');
}

const edit = (req, res) => {
    Patient.findById(req.params.id, (err, found) => {
        if(!err && found) {
            res.render('editPatient', {patient: found});
        } else {
            res.render('err', {error: err});
        }
    })
}

const remove = (req, res) => {
    Patient.findByIdAndDelete(req.params.id,(err, docs) => {
        if(!err) {
            // console.log(found);
            res.redirect('/');
        } else {
            res.render('err', {error: err});
        }
    })
}
const view = (req, res) => {
    Patient.findById(req.params.id,(err, found) => {
        if(!err && found) {
            res.render('viewPatient', {patient: found});
        } else {
            res.render('err', {error: err});
        }
    })
}
const add = (req, res) => {

    let symptoms = req.body.symptoms.split(",");
    let current = new Date();
    const newPatient = {
        name: req.body.name,
        number: req.body.number,
        city: req.body.city,
        country: req.body.country,
        dob: req.body.dob,
        symptoms: symptoms,
        time: current.toLocaleString(),
        applicationNumber: uuidv4(),
        gender: req.body.gender
    }

    Patient.create(newPatient, (err, patient) => {
        if(!err) {
            res.redirect('/');
        } else {
            res.render('err', {error: err});
        }
    });
}
const update = (req, res) => {
    let symptoms = req.body.symptoms.split(",");
    const updated = {
        name: req.body.name,
        number: req.body.number,
        city: req.body.city,
        country: req.body.country,
        dob: req.body.dob,
        symptoms: symptoms,
        gender: req.body.gender
    }
    console.log(req.body.id);
    Patient.findByIdAndUpdate(req.body.id,updated,(err, docs) => {
        if(!err) {
            res.redirect('/');
        } else {
            res.render('err', {error: err});
        }
    })
}

module.exports = {
    index, newPatient, edit, remove, add, update, view
}