const express = require('express');
const router = express.Router();
const SalesReport = require('../models/SalesReport'); // Assuming the model is named SalesReport

// @route   GET api/sales/all
// @desc    Get all sales reports
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const reports = await SalesReport.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
