const mongoose = require('mongoose');

const paymentReceiptSchema = new mongoose.Schema({
  docketNo: String,
  amountPaid: Number,
  paymentDate: { type: Date, default: Date.now },
  paymentMode: String,
  transportType: { type: String, enum: ['domestic', 'local'], required: true },
});

module.exports = mongoose.model('PaymentReceipt', paymentReceiptSchema);
