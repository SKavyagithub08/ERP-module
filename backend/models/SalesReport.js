const mongoose = require('mongoose');

const salesReportSchema = new mongoose.Schema({
  docketNo: String,
  totalFreight: Number,
  transporter: String,
  vehicleNo: String,
  date: { type: Date, default: Date.now },
  transportType: { type: String, enum: ['domestic', 'local'], required: true },
});

module.exports = mongoose.model('SalesReport', salesReportSchema);
