import { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then(res => setInvoices(res.data))
      .catch(err => alert("Failed to load invoices"));
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Docket No</th><th>Date</th><th>Consignor</th><th>Consignee</th><th>Amount</th><th>GST</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv._id}>
              <td>{inv.docketNo}</td>
              <td>{new Date(inv.date).toLocaleDateString()}</td>
              <td>{inv.consignor}</td>
              <td>{inv.consignee}</td>
              <td>{inv.amount}</td>
              <td>{inv.gst}%</td>
              <td>{inv.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
