const express = require('express');
const router = express.Router();
const { createDispatch } = require('../controllers/dispatchController');

router.post('/create', createDispatch);

module.exports = router;
