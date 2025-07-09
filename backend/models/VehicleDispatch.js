// const mongoose = require('mongoose');

// const vehicleDispatchSchema = new mongoose.Schema({
//   docketNo: { type: String, required: true },
//   dispatchDate: { type: Date, required: true },
//   driverName: { type: String, required: true },
//   vehicleNo: { type: String, required: true },
//   transporterName: { type: String, required: true },
//   freightAmount: { type: Number, required: true },
//   advancePaid: { type: Number, required: true },
//   balanceDue: { type: Number, required: true },
//   remarks: { type: String },
//   transportType: { type: String, enum: ['domestic', 'local'], required: true }
// });

// module.exports = mongoose.model('VehicleDispatch', vehicleDispatchSchema);


const mongoose = require('mongoose');

const vehicleDispatchSchema = new mongoose.Schema({
  docketNo: { type: String, required: true },
  dispatchDate: { type: Date, required: true },
  driverName: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  transporterName: { type: String, required: true },
  freightAmount: { type: Number, required: true },
  advancePaid: { type: Number, required: true },
  balanceDue: { type: Number, required: true },
  remarks: { type: String },
  transportType: {
    type: String,
    enum: ['domestic', 'local'],
    required: true,
    lowercase: true // ✅ this makes sure 'Domestic' → 'domestic' before validation
  }
});

module.exports = mongoose.model('VehicleDispatch', vehicleDispatchSchema);
