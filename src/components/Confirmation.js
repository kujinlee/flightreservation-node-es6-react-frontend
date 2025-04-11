import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBackendUrl } from '../utils/validateEnv'; // Import the utility function

let backendUrl;
try {
  backendUrl = getBackendUrl(); // Get the backend URL
} catch (error) {
  console.error(error.message);
}

function Confirmation() {
  const { state } = useLocation(); // Access reservation details passed via state
  const navigate = useNavigate();

  // Ensure state and reservation exist
  const reservation = state?.reservation;
  console.log('State from useLocation:', state); // Log the state object
  console.log('Reservation object:', reservation); // Log the reservation object

  if (!reservation) {
    return (
      <div>
        <p>Reservation details are not available. Please go back and try again.</p>
        <button onClick={() => navigate('/findFlights')}>Go Back</button>
      </div>
    );
  }

  const [reservationState, setReservationState] = useState(state?.reservation || {});
  const [showConfirmButton, setShowConfirmButton] = useState(true);
  const [message, setMessage] = useState(reservationState?.message || '');

  const { reservation: reservationDetails = {}, flightDetails = {}, passengerDetails = {} } = reservationState;
  console.log('Reservation details:', reservationDetails); // Log reservationDetails

  const handleConfirmReservation = async () => {
    try {
      const requestBody = { reservationId: reservationDetails.id };
      console.log('Request body being sent:', requestBody); // Log the request body

      const response = await fetch(`${backendUrl}/completeReservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Ensure reservationId is sent
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
      <p>Reservation ID: {reservationDetails.id || 'N/A'}</p>
      <p>Amount Paid: ${Number(reservationDetails.amount || 0).toFixed(2)}</p> {/* Fallback to 0 if amount is undefined */}
      <p>Card Number: **** **** **** {reservationDetails.cardNumber?.slice(-4) || 'N/A'}</p> {/* Handle undefined cardNumber */}

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
