import React, { useState, useEffect } from 'react';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/reservations')
            .then(response => response.json())
            .then(data => setReservations(data));
    }, []);

    const handleCancel = (id) => {
        fetch(`http://localhost:8000/reservations/${id}`, { method: 'DELETE' })
            .then(() => setReservations(reservations.filter(reservation => reservation.id !== id)));
    };

    const handleReschedule = (id, newDate) => {
        // Logic to reschedule the appointment
    };

    return (
        <div>
            <h1>Mes réservations</h1>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        {reservation.service.name} - {reservation.date}
                        <button onClick={() => handleCancel(reservation.id)}>Annuler</button>
                        <button onClick={() => handleReschedule(reservation.id, new Date())}>Décaler</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reservations;
