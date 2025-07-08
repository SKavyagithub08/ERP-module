import { Outlet, Link } from 'react-router-dom';

const LocalDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>🚛 Local Dashboard</h2>
      <nav style={{ marginBottom: '10px' }}>
        <Link to="docket-booking">Docket Booking</Link> |{" "}
        <Link to="invoices">Invoices</Link> |{" "}
        <Link to="outstanding">Outstanding Report</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default LocalDashboard;
