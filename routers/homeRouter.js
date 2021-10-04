const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/new', homeController.newPatient);
router.get('/edit/:id', homeController.edit);
router.get('/delete/:id', homeController.remove);
router.get('/view/:id/', homeController.view);
router.post('/add', homeController.add);
router.post('/update', homeController.update);


module.exports = router;