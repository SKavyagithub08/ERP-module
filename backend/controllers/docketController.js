const Docket = require('../models/Docket');
const Invoice = require('../models/Invoice');
const Outstanding = require('../models/Outstanding');

const generateDocketNo = () => {
  return 'DCKT' + Date.now().toString().slice(-6);
};

const createDocketBooking = async (req, res) => {
  try {
    const docketNo = generateDocketNo();

    const newDocket = new Docket({
      ...req.body,
      docketNo,
    });
    await Invoice.create({
  docketNo: newDocket.docketNo,
  date: new Date(),
  consignor: newDocket.consignorName,
  consignee: newDocket.consigneeName,
  amount: newDocket.subTotal,
  gst: newDocket.gstTax,
  totalAmount: newDocket.grandTotal,
});

await Outstanding.create({
  docketNo: newDocket.docketNo,
  partyName: newDocket.consignorName,
  invoiceAmount: newDocket.grandTotal,
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
});

    await newDocket.save();

    res.status(201).json({
      message: 'Docket created',
      docket: newDocket,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating docket', error });
  }
};

module.exports = { createDocketBooking };
