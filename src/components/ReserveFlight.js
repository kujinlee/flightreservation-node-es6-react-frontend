import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReserveFlight() {
  const { state } = useLocation(); // Access flight details passed via state
  const navigate = useNavigate();
  const flight = state?.flight;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:8080/flightreservation-node-es6-react-backend/createReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId: flight.id,
          firstName,
          lastName,
          email,
          phone,
          cardNumber,
          amount,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Reservation successful:', data);
        navigate('/confirmation', { state: { reservation: data } }); // Navigate to confirmation page
      } else {
        const errorText = await response.text(); // Read the response as text for debugging
        console.error('Error creating reservation:', errorText);
      }
    } catch (error) {
      console.error('Network error or server not responding:', error);
    }
  };

  if (!flight) {
    return <p>No flight information available. Please go back and try again.</p>;
  }

  return (
    <div>
      <h2>Reserve Flight</h2>
      <p>Flight Number: {flight.flightNumber}</p>
      <p>Airline: {flight.operatingAirlines}</p>
      <p>Departure City: {flight.departureCity}</p>
      <p>Arrival City: {flight.arrivalCity}</p>
      <p>Departure Date: {flight.dateOfDeparture}</p>
      <p>Estimated Departure Time: {flight.estimatedDepartureTime}</p>
      <p>Price: ${flight.price.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
}

export default ReserveFlight;
