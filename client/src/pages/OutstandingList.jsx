import { useEffect, useState } from 'react';
import axios from 'axios';

const OutstandingList = () => {
  const [outstanding, setOutstanding] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/outstanding')
      .then(res => setOutstanding(res.data))
      .catch(err => alert("Failed to load outstanding"));
  }, []);

  return (
    <div>
      <h2>Outstanding Report</h2>
      <table>
        <thead>
          <tr>
            <th>Docket No</th><th>Party</th><th>Amount</th><th>Status</th><th>Due Date</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingList;
