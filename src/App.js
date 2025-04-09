import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FindFlights from './components/FindFlights';
import ReserveFlight from './components/ReserveFlight';
import Confirmation from './components/Confirmation'; // Import the new Confirmation component
import CheckIn from './components/CheckIn';
import CheckInConfirmation from './components/CheckInConfirmation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FindFlights />} />
      <Route path="/reserve" element={<ReserveFlight />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/checkIn" element={<CheckIn />} /> {/* Add CheckIn route */}
      <Route path="/checkInConfirmation" element={<CheckInConfirmation />} /> {/* Add CheckInConfirmation route */}
    </Routes>
  );
}

export default App;
