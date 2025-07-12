// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const SalesReport = () => {
//   const [sales, setSales] = useState([]);

//   useEffect(() => {
//     const fetchSales = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/sales/all');
//         setSales(res.data);
//       } catch (err) {
//         console.error('Error fetching sales reports:', err);
//       }
//     };

//     fetchSales();
//   }, []);

//   return (
//     <div>
//       <h2>Sales Report</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Docket No</th>
//             <th>Total Freight</th>
//             <th>Transporter</th>
//             <th>Vehicle No</th>
//             <th>Date</th>
//             <th>Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map((s) => (
//             <tr key={s._id}>
//               <td>{s.docketNo}</td>
//               <td>₹{s.totalFreight}</td>
//               <td>{s.transporter}</td>
//               <td>{s.vehicleNo}</td>
//               <td>{new Date(s.date).toLocaleDateString()}</td>
//               <td>{s.transportType}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesReport;


import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../components/index.css';

const SalesReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const transportType = sessionStorage.getItem('transportType');
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sales/all?transportType=${transportType}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching sales reports:', error);
      }
    };

    fetchReports();
  }, []);

  const downloadSinglePDF = (report) => {
    const doc = new jsPDF();
    doc.text(`Sales Report for Docket: ${report.docketNo}`, 20, 10);
    doc.autoTable({
      head: [['Total Freight', 'Transporter', 'Vehicle No', 'Date', 'Transport Type']],
      body: [[
        report.totalFreight,
        report.transporter,
        report.vehicleNo,
        new Date(report.date).toLocaleDateString(),
        report.transportType
      ]],
    });
    doc.save(`sales-report-${report.docketNo}.pdf`);
  };

  return (
    <div className="page-container">
      <h2>Sales Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Docket No</th>
            <th>Total Freight</th>
            <th>Transporter</th>
            <th>Vehicle No</th>
            <th>Date</th>
            <th>Transport Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.docketNo}</td>
              <td>{report.totalFreight}</td>
              <td>{report.transporter}</td>
              <td>{report.vehicleNo}</td>
              <td>{new Date(report.date).toLocaleDateString()}</td>
              <td>{report.transportType}</td>
              <td>
                <button onClick={() => downloadSinglePDF(report)} className="download-pdf-button">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;