import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBackendUrl } from '../utils/validateEnv'; // Import the utility function

let backendUrl;
try {
  backendUrl = getBackendUrl(); // Get the backend URL
} catch (error) {
  console.error(error.message);
}

function CheckIn() {
  const { state } = useLocation(); // Access reservation details passed via state
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [numberOfBags, setNumberOfBags] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!backendUrl) {
      setMessage('Configuration error: Backend URL is not properly defined.');
      return;
    }

    const fetchCheckInData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/checkIn?reservationId=${state?.reservationId}`
        );
        if (response.ok) {
          const data = await response.json();
          setReservation(data.reservation);
        } else {
          const errorText = await response.text();
          console.error('Error fetching check-in data:', errorText);
          setMessage('Error fetching check-in data. Please try again.');
        }
      } catch (error) {
        console.error('Network error or server not responding:', error);
        setMessage('Network error or server not responding.');
      }
    };

    if (state?.reservationId) {
      fetchCheckInData();
    } else {
      setMessage('No reservation ID provided.');
    }
  }, [state]);

  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${backendUrl}/completeCheckIn`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reservationId: reservation.id, numberOfBags }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate('/checkInConfirmation', { state: { confirmation: data } }); // Navigate to confirmation page
      } else {
        const errorText = await response.text();
        console.error('Error during check-in:', errorText);
        setMessage('Error during check-in. Please try again.');
      }
    } catch (error) {
      console.error('Network error or server not responding:', error);
      setMessage('Network error or server not responding.');
    }
  };

  if (!reservation) {
    return <p>{message || 'Loading reservation details...'}</p>;
  }

  return (
    <div>
      <h2>Check-In</h2>
      <p>Reservation ID: {reservation.id}</p>
      <p>Flight Number: {reservation.flight.flightNumber}</p>
      <p>Passenger Name: {reservation.passenger.firstName} {reservation.passenger.lastName}</p>
      <form onSubmit={handleCheckIn}>
        <label>
          Number of Bags:
          <input
            type="number"
            value={numberOfBags}
            onChange={(e) => setNumberOfBags(e.target.value)}
            min="0"
            required
          />
        </label>
        <br />
        <button type="submit">Complete Check-In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckIn;
