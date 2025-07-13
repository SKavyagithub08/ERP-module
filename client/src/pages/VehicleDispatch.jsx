import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../components/index.css'; // Assuming you have some styles defined here

const VehicleDispatch = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [form, setForm] = useState({
    docketNo: '',
    dispatchDate: '',
    driverName: '',
    vehicleNo: '',
    transporterName: '',
    freightAmount: '',
    advancePaid: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transportType = sessionStorage.getItem('transportType');

    const data = {
      ...form,
      freightAmount: Number(form.freightAmount),
      advancePaid: Number(form.advancePaid),
      balanceDue: Number(form.freightAmount) - Number(form.advancePaid),
      transportType
    };

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://erp-module-1k4b.onrender.com';
      await axios.post(`${apiUrl}/api/dispatch/create`, data);
      alert('🚚 Dispatch + Payment + Sales Report created!');
      
      // Redirect after successful submission
      navigate('/payment-receipt');

    } catch (err) {
      alert('❌ Failed. Check console.');
      console.error('Dispatch error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Vehicle Dispatch</h2>
      <form onSubmit={handleSubmit}>
        <input name="docketNo" placeholder="Docket No" onChange={handleChange} value={form.docketNo} required />
        <input name="dispatchDate" type="date" onChange={handleChange} value={form.dispatchDate} required />
        <input name="driverName" placeholder="Driver Name" onChange={handleChange} value={form.driverName} required />
        <input name="vehicleNo" placeholder="Vehicle No" onChange={handleChange} value={form.vehicleNo} required />
        <input name="transporterName" placeholder="Transporter Name" onChange={handleChange} value={form.transporterName} required />
        <input name="freightAmount" placeholder="Freight Amount" type="number" onChange={handleChange} value={form.freightAmount} required />
        <input name="advancePaid" placeholder="Advance Paid" type="number" onChange={handleChange} value={form.advancePaid} required />
        <input name="remarks" placeholder="Remarks" onChange={handleChange} value={form.remarks} />
        <button type="submit">Submit Dispatch</button>
      </form>
    </div>
  );
};

export default VehicleDispatch;
