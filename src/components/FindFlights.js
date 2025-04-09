import React, { useState } from 'react';
import FindFlightsResults from './FindFlightsResults';

function FindFlights() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(departureDate).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    console.log('Sending request with:', { from, to, departureDate: formattedDate }); // Log request data
    try {
      const response = await fetch('https://localhost:8080/flightreservation-node-es6-react-backend/findFlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, departureDate: formattedDate }),
      });

      console.log('Response status:', response.status); // Log response status
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Log response data
        setFlights(data.flights);
        setMessage('');
      } else {
        const errorData = await response.json();
        console.error('Error response data:', errorData); // Log error response
        setMessage(errorData.message || 'Error fetching flight data.');
      }
    } catch (error) {
      console.error('Network error or server not responding:', error); // Log network error
      setMessage('Network error or server not responding.');
    }
  };

  return (
    <div>
      <h2>Find Flights</h2>
      <form onSubmit={handleSubmit}>
        <label>
          From:
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          To:
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      <FindFlightsResults flights={flights} message={message} />
    </div>
  );
}

export default FindFlights;
