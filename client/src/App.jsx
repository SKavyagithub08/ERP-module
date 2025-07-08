// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import SelectTransport from './pages/SelectTransport';
// import RegisterUser from './pages/RegisterUser'; 
// import DocketBooking from './pages/DocketBooking';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/select-transport" element={<SelectTransport />} />
//       <Route path="/register-user" element={<RegisterUser />} />
//     </Routes>
//   );
// };

// export default App;


import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SelectTransport from './pages/SelectTransport';
import RegisterUser from './pages/RegisterUser';
import DocketBooking from './pages/DocketBooking';
import InvoiceList from './pages/InvoiceList';
import OutstandingList from './pages/OutstandingList';
import DomesticDashboard from './pages/DomesticDashboard';
import LocalDashboard from './pages/LocalDashboard';

const App = () => {
  return (
    <Routes>
      {/* Step 1: Auth + Transport */}
      <Route path="/" element={<Login />} />
      <Route path="/select-transport" element={<SelectTransport />} />
      <Route path="/register-user" element={<RegisterUser />} />

      {/* Step 2: Domestic Flow */}
      <Route path="/domestic" element={<DomesticDashboard />}>
        <Route path="docket-booking" element={<DocketBooking />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="outstanding" element={<OutstandingList />} />
      </Route>

      {/* Step 3: Local Flow */}
      <Route path="/local" element={<LocalDashboard />}>
        <Route path="docket-booking" element={<DocketBooking />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="outstanding" element={<OutstandingList />} />
      </Route>
    </Routes>
  );
};

export default App;
