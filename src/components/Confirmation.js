import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Confirmation() {
  const { state } = useLocation(); // Access reservation details passed via state
  const navigate = useNavigate();

  const [reservationState, setReservationState] = useState(state?.reservation);
  const [showConfirmButton, setShowConfirmButton] = useState(true);
  const [message, setMessage] = useState(reservationState?.message || '');

  if (!reservationState) {
    return <p>No reservation details available. Please go back and try again.</p>;
  }

  const { reservation: reservationDetails, flightDetails, passengerDetails } = reservationState;

  const handleConfirmReservation = async () => {
    try {
      const response = await fetch('https://localhost:8080/flightreservation-node-es6-react-backend/completeReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId: reservationDetails.id }),
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setReservationState((prev) => ({
          ...prev,
          message: data.message,
        }));
        setMessage(data.message);
        setShowConfirmButton(false);
      } else {
        const errorText = await response.text(); // Read the response as text for debugging
        console.error('Error confirming reservation:', errorText);
        setMessage('Error confirming reservation. Please try again.');
      }
    } catch (error) {
      console.error('Network error or server not responding:', error);
      setMessage('Network error or server not responding.');
    }
  };

  return (
    <div>
      <h2>Reservation Confirmation</h2>
      <p>{message}</p>
      <h3>Reservation Details</h3>
      <p>Reservation ID: {reservationDetails.id}</p>
      <p>Amount Paid: ${Number(reservationDetails.amount).toFixed(2)}</p> {/* Convert amount to a number */}

      <h3>Flight Details</h3>
      <p>Flight Number: {flightDetails.flightNumber}</p>
      <p>Departure City: {flightDetails.departureCity}</p>
      <p>Arrival City: {flightDetails.arrivalCity}</p>
      <p>Date of Departure: {flightDetails.dateOfDeparture}</p>
      <p>Estimated Departure Time: {flightDetails.estimatedDepartureTime}</p>

      <h3>Passenger Details</h3>
      <p>Name: {passengerDetails.name}</p>
      <p>Email: {passengerDetails.email}</p>

      {showConfirmButton ? (
        <button onClick={handleConfirmReservation}>Confirm Reservation</button>
      ) : (
        <button onClick={() => navigate('/checkIn', { state: { reservationId: reservationDetails.id } })}>
          Continue to Check-In
        </button>
      )}

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default Confirmation;
