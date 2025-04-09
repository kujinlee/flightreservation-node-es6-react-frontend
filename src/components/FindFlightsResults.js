import React from 'react';
import { useNavigate } from 'react-router-dom';

function FindFlightsResults({ flights, message }) {
  const navigate = useNavigate();

  const handleReserve = (flight) => {
    navigate('/reserve', {
      state: {
        flight,
      },
    });
  };

  return (
    <div>
      <h2>Flight Search Results</h2>
      {flights && flights.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Departure Date</th>
              <th>Estimated Departure Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.operatingAirlines}</td>
                <td>{flight.departureCity}</td>
                <td>{flight.arrivalCity}</td>
                <td>{flight.dateOfDeparture}</td>
                <td>{flight.estimatedDepartureTime}</td>
                <td>${flight.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleReserve(flight)}>Reserve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{message || 'No flights found.'}</p>
      )}
    </div>
  );
}

export default FindFlightsResults;
