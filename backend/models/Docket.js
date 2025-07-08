const mongoose = require('mongoose');

const docketSchema = new mongoose.Schema({
  dateOfBooking: { type: Date, required: true },
  docketNo: { type: String, unique: true, required: true },
  from: String,
  destination: String,
  consignorName: String,
  consigneeName: String,
  noOfPkgs: Number,
  actualWeight: Number,
  chargeableWeight: Number,
  content: String,
  packingType: String,
  ewaybillNo: String,
  invoiceNo: String,
  invoiceValue: Number,
  bookingType: { type: String, enum: ['Domestic', 'Local'] },
  paymentMode: { type: String, enum: ['Topay', 'Credit', 'Cash'] },
  freightComponents: String,
  rateType: { type: String, enum: ['Fixed', 'Sundry'] },
  freightCharges: Number,
  loadingCharges: Number,
  unloadingCharges: Number,
  docketCharges: Number,
  craneCharges: Number,
  gstTax: Number,
  subTotal: Number,
  grandTotal: Number,
});

module.exports = mongoose.model('Docket', docketSchema);
