// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const PaymentReceipt = () => {
//   const [receipts, setReceipts] = useState([]);

//   useEffect(() => {
//     const fetchReceipts = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/receipt/all');
//         setReceipts(res.data);
//       } catch (err) {
//         console.error('Error fetching payment receipts:', err);
//       }
//     };

//     fetchReceipts();
//   }, []);

//   return (
//     <div>
//       <h2>Payment Receipts</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Docket No</th>
//             <th>Amount Paid</th>
//             <th>Payment Mode</th>
//             <th>Date</th>
//             <th>Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {receipts.map((r) => (
//             <tr key={r._id}>
//               <td>{r.docketNo}</td>
//               <td>₹{r.amountPaid}</td>
//               <td>{r.paymentMode}</td>
//               <td>{new Date(r.paymentDate).toLocaleDateString()}</td>
//               <td>{r.transportType}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentReceipt;



import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../components/index.css';

const PaymentReceipt = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('https://erp-module-3.onrender.com/api/receipt/all');
        setReceipts(response.data);
      } catch (error) {
        console.error('Error fetching payment receipts:', error);
      }
    };

    fetchReceipts();
  }, []);

  const downloadSinglePDF = (receipt) => {
    const doc = new jsPDF();
    doc.text(`Payment Receipt for Docket: ${receipt.docketNo}`, 20, 10);
    doc.autoTable({
      head: [['Amount Paid', 'Payment Date', 'Payment Mode', 'Transport Type']],
      body: [[
        receipt.amountPaid,
        new Date(receipt.paymentDate).toLocaleDateString(),
        receipt.paymentMode,
        receipt.transportType
      ]],
    });
    doc.save(`payment-receipt-${receipt.docketNo}.pdf`);
  };

  return (
    <div className="page-container">
      <h2>Payment Receipts</h2>
      <table>
        <thead>
          <tr>
            <th>Docket No</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
            <th>Payment Mode</th>
            <th>Transport Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt._id}>
              <td>{receipt.docketNo}</td>
              <td>{receipt.amountPaid}</td>
              <td>{new Date(receipt.paymentDate).toLocaleDateString()}</td>
              <td>{receipt.paymentMode}</td>
              <td>{receipt.transportType}</td>
              <td>
                <button onClick={() => downloadSinglePDF(receipt)} className="download-pdf-button">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentReceipt;