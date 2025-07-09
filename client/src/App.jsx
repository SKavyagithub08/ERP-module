import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SelectTransport from './pages/SelectTransport';
import RegisterUser from './pages/RegisterUser';
import DocketBooking from './pages/DocketBooking';
import InvoiceList from './pages/InvoiceList';
import OutstandingList from './pages/OutstandingList';
import VehicleDispatch from './pages/VehicleDispatch';
import PaymentReceipt from './pages/PaymentReceipt'; // (optional now)
import SalesReport from './pages/SalesReport';       // (optional now)
import DomesticDashboard from './pages/DomesticDashboard';
import LocalDashboard from './pages/LocalDashboard';

const App = () => {
  return (
    <Routes>
      {/* 🔐 Auth Flow */}
      <Route path="/" element={<Login />} />
      <Route path="/select-transport" element={<SelectTransport />} />
      <Route path="/register-user" element={<RegisterUser />} />

      {/* 🏠 Domestic Dashboard (Party Master / Master) */}
      <Route path="/domestic/dashboard" element={<DomesticDashboard />}>
        <Route path="docket-booking" element={<DocketBooking />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="outstanding" element={<OutstandingList />} />
      </Route>

      {/* 🏠 Local Dashboard (Party Master / Master) */}
      <Route path="/local/dashboard" element={<LocalDashboard />}>
        <Route path="docket-booking" element={<DocketBooking />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="outstanding" element={<OutstandingList />} />
      </Route>

      {/* 🚚 Vehicle Master Flow */}
      <Route path="/vehicle-dispatch" element={<VehicleDispatch />} />
      <Route path="/payment-receipt" element={<PaymentReceipt />} />
      <Route path="/sales-report" element={<SalesReport />} />


      {/* ✅ Add Vendor or Finance Master flows later as needed */}
    </Routes>
  );
};

export default App;
