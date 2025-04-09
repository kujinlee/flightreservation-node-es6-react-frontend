import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FindFlights from './components/FindFlights';
import ReserveFlight from './components/ReserveFlight';
import Confirmation from './components/Confirmation';
import CheckIn from './components/CheckIn';
import CheckInConfirmation from './components/CheckInConfirmation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/findFlights" />} /> {/* Redirect root to /findFlights */}
      <Route path="/findFlights" element={<FindFlights />} />
      <Route path="/reserve" element={<ReserveFlight />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/checkIn" element={<CheckIn />} />
      <Route path="/checkInConfirmation" element={<CheckInConfirmation />} />
      <Route path="*" element={<div>404: Page Not Found</div>} />
    </Routes>
  );
}

export default App;