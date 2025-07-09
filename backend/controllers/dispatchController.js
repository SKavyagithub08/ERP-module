const VehicleDispatch = require('../models/VehicleDispatch');
const PaymentReceipt = require('../models/PaymentReceipt');
const SalesReport = require('../models/SalesReport');

const createDispatch = async (req, res) => {
  try {
    const dispatch = await VehicleDispatch.create(req.body);

    await PaymentReceipt.create({
      docketNo: dispatch.docketNo,
      amountPaid: dispatch.advancePaid,
      paymentMode: 'Cash',
      transportType: dispatch.transportType,
    });

    await SalesReport.create({
      docketNo: dispatch.docketNo,
      totalFreight: dispatch.freightAmount,
      transporter: dispatch.transporterName,
      vehicleNo: dispatch.vehicleNo,
      transportType: dispatch.transportType,
    });

    res.status(201).json({ message: 'Vehicle Dispatch, Payment Receipt, and Sales Report created' });
  } catch (err) {
    console.error('Error creating dispatch:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createDispatch };
