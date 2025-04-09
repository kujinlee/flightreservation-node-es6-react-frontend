import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FlightDetails() {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);

    useEffect(() => {
        fetch(`/api/flights/${id}`)
            .then(response => response.json())
            .then(data => setFlight(data))
            .catch(error => console.error('Error fetching flight details:', error));
    }, [id]);

    if (!flight) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Flight Details</h2>
            <p>Flight Number: {flight.flightNumber}</p>
            <p>Destination: {flight.arrivalCity}</p>
            <p>Departure: {flight.departureCity}</p>
        </div>
    );
}

export default FlightDetails;
