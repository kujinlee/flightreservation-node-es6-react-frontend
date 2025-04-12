import React, { useState, useEffect } from 'react';
import FindFlightsResults from './FindFlightsResults';

function FindFlights() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const frontendUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    console.log('Frontend URL:', frontendUrl); // Log the frontend URL
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(departureDate).toISOString().split('T')[0]; // Format date to YYYY-MM-DD

    // Validate environment variables
    const host = process.env.REACT_APP_BACKEND_APP_HOST;
    const port = process.env.REACT_APP_BACKEND_APP_PORT;
    const baseUrl = process.env.REACT_APP_BACKEND_APP_BASE_URL;

    console.log('Environment Variables:', { host, port, baseUrl }); // Debug environment variables

    if (!host || !port || !baseUrl) {
      console.error('Environment variables REACT_APP_BACKEND_APP_HOST, REACT_APP_BACKEND_APP_PORT, or REACT_APP_BACKEND_APP_BASE_URL are not defined.');
      setMessage('Configuration error: Backend URL is not properly defined.');
      return;
    }

    const backendUrl = `https://${host}:${port}${baseUrl}`;
    console.log('Sending request to:', backendUrl); // Log the constructed URL

    try {
      const response = await fetch(`${backendUrl}/findFlights`, { // Construct full backend URL
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
