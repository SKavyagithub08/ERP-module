const express = require('express');
const router = express.Router();
const Outstanding = require('../models/Outstanding');

router.get('/', async (req, res) => {
  try {
    const dues = await Outstanding.find().sort({ dueDate: 1 });
    res.json(dues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch outstanding reports' });
  }
});

module.exports = router;
