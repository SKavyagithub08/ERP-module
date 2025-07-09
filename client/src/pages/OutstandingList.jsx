import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../components/index.css';

const OutstandingList = () => {
  const [outstanding, setOutstanding] = useState([]);

  useEffect(() => {
    const transportType = sessionStorage.getItem('transportType');
    axios.get(`http://localhost:5000/api/outstanding?transportType=${transportType}`)
      .then(res => setOutstanding(res.data))
      .catch(err => alert("Failed to load outstanding"));
  }, []);

  const downloadSinglePDF = (due) => {
    const doc = new jsPDF();
    doc.text(`Outstanding Report for Docket: ${due.docketNo}`, 20, 10);
    doc.autoTable({
      head: [['Party', 'Amount', 'Status', 'Due Date']],
      body: [[
        due.partyName,
        due.invoiceAmount,
        due.paymentStatus,
        new Date(due.dueDate).toLocaleDateString()
      ]],
    });
    doc.save(`outstanding-report-${due.docketNo}.pdf`);
  };

  return (
    <div className="page-container">
      <h2>Outstanding Report</h2>
      <table>
        <thead>
          <tr>
            <th>Docket No</th><th>Party</th><th>Amount</th><th>Status</th><th>Due Date</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {outstanding.map(due => (
            <tr key={due._id}>
              <td>{due.docketNo}</td>
              <td>{due.partyName}</td>
              <td>{due.invoiceAmount}</td>
              <td>{due.paymentStatus}</td>
              <td>{new Date(due.dueDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => downloadSinglePDF(due)} className="download-pdf-button">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingList;
