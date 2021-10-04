const Patient = require('../models/patientModel');

const index = (req, res) => {
    alert = '';
    res.redirect('/home');
}

const newPatient = async (req, res) => {
    res.render('new')
}

const edit = async (req, res) => {
    res.redirect('/home');
}

const remove = (req, res) => {
    Patient.find({},(err, found) => {
        if(!err && found) {
            // console.log(found);
            res.json(found);
        } else {
            console.log(err);
        }
    })
}
const view = (req, res) => {
    Patient.find({},(err, found) => {
        if(!err && found) {
            // console.log(found);
            res.json(found);
        } else {
            console.log(err);
        }
    })
}
const add = (req, res) => {
    Patient.find({},(err, found) => {
        if(!err && found) {
            // console.log(found);
            res.json(found);
        } else {
            console.log(err);
        }
    })
}
const update = (req, res) => {
    Patient.find({},(err, found) => {
        if(!err && found) {
            // console.log(found);
            res.json(found);
        } else {
            console.log(err);
        }
    })
}

module.exports = {
    index, newPatient, edit, remove, add, update, view
}