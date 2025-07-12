import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../components/index.css';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const transportType = sessionStorage.getItem('transportType');
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/invoices?transportType=${transportType}`)
      .then(res => setInvoices(res.data))
      .catch(err => alert("Failed to load invoices"));
  }, []);

  const downloadSinglePDF = (inv) => {
    const doc = new jsPDF();
    doc.text(`Invoice for Docket: ${inv.docketNo}`, 20, 10);
    doc.autoTable({
      head: [['Date', 'Consignor', 'Consignee', 'Amount', 'GST', 'Total']],
      body: [[
        new Date(inv.date).toLocaleDateString(),
        inv.consignor,
        inv.consignee,
        inv.amount,
        `${inv.gst}%`,
        inv.totalAmount
      ]],
    });
    doc.save(`invoice-${inv.docketNo}.pdf`);
  };

  return (
    <div className="page-container">
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Docket No</th><th>Date</th><th>Consignor</th><th>Consignee</th><th>Amount</th><th>GST</th><th>Total</th><th>Action</th>
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
              <td>
                <button onClick={() => downloadSinglePDF(inv)} className="download-pdf-button">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
