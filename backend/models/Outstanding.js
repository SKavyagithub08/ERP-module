const mongoose = require('mongoose');

const outstandingSchema = new mongoose.Schema({
  docketNo: String,
  partyName: String,
  invoiceAmount: Number,
  paymentStatus: { type: String, default: 'Unpaid' },
  dueDate: Date,
});

module.exports = mongoose.model('Outstanding', outstandingSchema);
