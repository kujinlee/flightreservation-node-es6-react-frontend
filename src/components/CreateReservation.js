import React, { useState } from 'react';
import { getBackendUrl } from '../utils/validateEnv'; // Import the utility function

let backendUrl;
try {
  backendUrl = getBackendUrl(); // Get the backend URL
} catch (error) {
  console.error(error.message);
}

function CreateReservation() {
  const [formData, setFormData] = useState({
    flightId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    amount: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/createReservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorText = await response.text();
        console.error('Error creating reservation:', errorText);
        setMessage('Error creating reservation. Please try again.');
      }
    } catch (error) {
      console.error('Network error or server not responding:', error);
      setMessage('Network error or server not responding.');
    }
  };

  return (
    <div>
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Flight ID:</label>
          <input
            type="text"
            value={formData.flightId}
            onChange={(e) => setFormData({ ...formData, flightId: e.target.value })}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>
        <button type="submit">Create Reservation</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateReservation;