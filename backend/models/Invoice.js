const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  docketNo: String,
  date: Date,
  consignor: String,
  consignee: String,
  amount: Number,
  gst: Number,
  totalAmount: Number,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
