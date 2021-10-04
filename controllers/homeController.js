const { v4: uuidv4 } = require('uuid');
const AES = require("crypto-js/aes");
const enc = require("crypto-js/enc-utf8");

const Patient = require('../models/patientModel');

const encrypt = (data) => {
    return AES.encrypt(data, process.env.CRYPTO_SECRET).toString();
}

const decrypt = (cipher) => {
    let bytes  = AES.decrypt(cipher, process.env.CRYPTO_SECRET);
    return bytes.toString(enc);
}

const encrypt_object = (patient, time, appno) => {
    let symptoms = patient.symptoms.split(",");
    let sym_array = []
    symptoms.forEach(element => {
        sym_array.push(encrypt(element));
    });
    let updated = {
        name: encrypt(patient.name),
        number: encrypt(patient.number),
        city: encrypt(patient.city),
        country: encrypt(patient.country),
        dob: encrypt(patient.dob),
        symptoms: sym_array,
        gender: encrypt(patient.gender),
    }

    if(time) {
        current = new Date();
        updated.time = encrypt(current.toLocaleString());
    }
    if(appno) {
        current = new Date();
        updated.applicationNumber = encrypt(uuidv4());
    }

    return updated
}

const decrypt_object = (patient) => {
    let sym_array = []
    patient.symptoms.forEach(element => {
        sym_array.push(decrypt(element));
    });
    let decrypted = {
        _id: patient._id,
        name: decrypt(patient.name),
        number: decrypt(patient.number),
        city: decrypt(patient.city),
        country: decrypt(patient.country),
        dob: decrypt(patient.dob),
        symptoms: sym_array,
        time: decrypt(patient.time),
        applicationNumber: decrypt(patient.applicationNumber),
        gender: decrypt(patient.gender)
    }

    return decrypted
}

const index = (req, res) => {
    Patient.find({},(err, found) => {
        if(!err && found) {
            let patients_arr = [];
            found.forEach(element => {
                patients_arr.push(decrypt_object(element));
            });
            res.render('index', {patients: patients_arr});
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
            res.render('editPatient', {patient: decrypt_object(found)});
        } else {
            res.render('err', {error: err});
        }
    })
}

const remove = (req, res) => {
    Patient.findByIdAndDelete(req.params.id,(err, docs) => {
        if(!err) {
            res.redirect('/');
        } else {
            res.render('err', {error: err});
        }
    })
}
const view = (req, res) => {
    
    Patient.findById(req.params.id,(err, found) => {
        
        if(!err && found) {
            res.render('viewPatient', {patient: decrypt_object(found)});
        } else {
            res.render('err', {error: err});
        }
    })
}
const add = (req, res) => {

    const newPatient = encrypt_object(req.body, true, true);

    Patient.create(newPatient, (err, patient) => {
        if(!err) {
            res.redirect('/');
        } else {
            res.render('err', {error: err});
        }
    });
}
const update = (req, res) => {

    const updated = encrypt_object(req.body, false, false)
    
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