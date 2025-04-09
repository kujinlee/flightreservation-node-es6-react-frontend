import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FlightList() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetch('/api/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, []);

    return (
        <div>
            <h2>Available Flights</h2>
            <ul>
                {flights.map(flight => (
                    <li key={flight.id}>
                        <Link to={`/flight/${flight.id}`}>{flight.flightNumber}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FlightList;
