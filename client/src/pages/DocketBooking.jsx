import { useState } from 'react';
import axios from 'axios';
import '../components/index.css'; // Assuming you have some styles defined here

const DocketBooking = () => {
  const [formData, setFormData] = useState({
    dateOfBooking: '',
    from: '',
    destination: '',
    consignorName: '',
    consigneeName: '',
    noOfPkgs: '',
    actualWeight: '',
    chargeableWeight: '',
    content: '',
    packingType: '',
    ewaybillNo: '',
    invoiceNo: '',
    invoiceValue: '',
    bookingType: 'Domestic',
    paymentMode: 'Topay',
    freightComponents: '',
    rateType: 'Fixed',
    freightCharges: '',
    loadingCharges: '',
    unloadingCharges: '',
    docketCharges: '',
    craneCharges: '',
    gstTax: '',
  });

  const calculateTotals = () => {
    const subTotal = [
      +formData.freightCharges,
      +formData.loadingCharges,
      +formData.unloadingCharges,
      +formData.docketCharges,
      +formData.craneCharges,
    ].reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);

    const gst = isNaN(+formData.gstTax) ? 0 : (+formData.gstTax / 100) * subTotal;
    const grandTotal = subTotal + gst;
    return { subTotal, grandTotal };
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subTotal, grandTotal } = calculateTotals();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/dockets/create`, {
        ...formData,
        subTotal,
        grandTotal,
      });

      alert('Docket Created Successfully');
      console.log(res.data);
    } catch (err) {
      alert('Error submitting docket');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }} className="page-container">
      <h2>Docket Booking</h2>
      <form onSubmit={handleSubmit}>
        <input name="dateOfBooking" type="date" onChange={handleChange} required />
        <input name="from" placeholder="From" onChange={handleChange} />
        <input name="destination" placeholder="Destination" onChange={handleChange} />
        <input name="consignorName" placeholder="Consignor Name" onChange={handleChange} />
        <input name="consigneeName" placeholder="Consignee Name" onChange={handleChange} />
        <input name="noOfPkgs" placeholder="No of Pkgs" onChange={handleChange} />
        <input name="actualWeight" placeholder="Actual Weight" onChange={handleChange} />
        <input name="chargeableWeight" placeholder="Chargeable Weight" onChange={handleChange} />
        <input name="content" placeholder="Content" onChange={handleChange} />
        <input name="packingType" placeholder="Packing Type" onChange={handleChange} />
        <input name="ewaybillNo" placeholder="E-Waybill No" onChange={handleChange} />
        <input name="invoiceNo" placeholder="Invoice No" onChange={handleChange} />
        <input name="invoiceValue" placeholder="Invoice Value" onChange={handleChange} />

        <select name="bookingType" onChange={handleChange}>
          <option>Domestic</option>
          <option>Local</option>
        </select>

        <select name="paymentMode" onChange={handleChange}>
          <option>Topay</option>
          <option>Credit</option>
          <option>Cash</option>
        </select>

        <input name="freightComponents" placeholder="Freight Components" onChange={handleChange} />

        <select name="rateType" onChange={handleChange}>
          <option>Fixed</option>
          <option>Sundry</option>
        </select>

        <input name="freightCharges" placeholder="Freight Charges" onChange={handleChange} />
        <input name="loadingCharges" placeholder="Loading Charges" onChange={handleChange} />
        <input name="unloadingCharges" placeholder="Unloading Charges" onChange={handleChange} />
        <input name="docketCharges" placeholder="Docket Charges" onChange={handleChange} />
        <input name="craneCharges" placeholder="Crane Charges" onChange={handleChange} />
        <input name="gstTax" placeholder="GST (%)" onChange={handleChange} />

        <button type="submit">Submit Docket</button>
      </form>
    </div>
  );
};

export default DocketBooking;
