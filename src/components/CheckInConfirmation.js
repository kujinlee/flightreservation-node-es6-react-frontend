import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CheckInConfirmation() {
  const { state } = useLocation(); // Access confirmation details passed via state
  const navigate = useNavigate();
  const confirmation = state?.confirmation;

  if (!confirmation) {
    return <p>No confirmation details available. Please go back and try again.</p>;
  }

  const { reservation, flight, passenger, message } = confirmation;

  return (
    <div>
      <h2>Check-In Confirmation</h2>
      <p>{message}</p>
      <h3>Reservation Details</h3>
      <p>Reservation ID: {reservation.id}</p>
      <p>Number of Bags: {reservation.numberOfBags}</p>
      <p>Checked In: {reservation.checkedIn ? 'Yes' : 'No'}</p>

      <h3>Flight Details</h3>
      <p>Flight Number: {flight.flightNumber}</p>
      <p>Departure City: {flight.departureCity}</p>
      <p>Arrival City: {flight.arrivalCity}</p>
      <p>Date of Departure: {flight.dateOfDeparture}</p>
      <p>Estimated Departure Time: {flight.estimatedDepartureTime}</p>

      <h3>Passenger Details</h3>
      <p>Name: {passenger.firstName} {passenger.lastName}</p>
      <p>Email: {passenger.email}</p>

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default CheckInConfirmation;
