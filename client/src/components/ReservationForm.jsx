// src/components/ReservationForm.jsx
import React, { useState } from 'react';

const ReservationForm = ({ slotId }) => {
    const [client, setClient] = useState('');
    const [coach, setCoach] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({ client: `/api/users/${client}`, coach: `/api/users/${coach}`, slot: `/api/slots/${slotId}`, status: 'PENDING' });

        try {
            const response = await fetch('http://localhost:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to create reservation');
            }

            alert('Reservation created!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Client ID:
                <input type="text" value={client} onChange={(e) => setClient(e.target.value)} />
            </label>
            <br />
            <label>
                Coach ID:
                <input type="text" value={coach} onChange={(e) => setCoach(e.target.value)} />
            </label>
            <br />
            <button type="submit">Reserve</button>
        </form>
    );
};

export default ReservationForm;
