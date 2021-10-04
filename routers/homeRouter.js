const express = require('express');
const router = express.Router();

router.get('/', fliqController.index);
router.get('/new', fliqController.newPatient);
router.get('/edit', fliqController.edit);
router.get('/delete/id', fliqController.remove);
router.get('/view/:id/', fliqController.view);
router.post('/add', fliqController.add);
router.post('/update', fliqController.update);


module.exports = router;