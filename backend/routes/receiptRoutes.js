const express = require('express');
const router = express.Router();
const PaymentReceipt = require('../models/PaymentReceipt'); // Assuming the model is named PaymentReceipt

// @route   GET api/receipt/all
// @desc    Get all payment receipts
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const receipts = await PaymentReceipt.find().sort({ paymentDate: -1 });
    res.json(receipts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
