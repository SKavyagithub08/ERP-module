const express = require('express');
const router = express.Router();
const { createDocketBooking } = require('../controllers/docketController');

router.post('/create', createDocketBooking);

module.exports = router;
