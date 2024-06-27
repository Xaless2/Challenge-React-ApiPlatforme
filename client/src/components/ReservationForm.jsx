// 

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
    const [clientId, setClientId] = useState('');
    const [slotId, setSlotId] = useState('');
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservation = {
            client_id: clientId,
            slot_id: slotId,
            date: date.toISOString().split('T')[0], // format date as YYYY-MM-DD
            status,
        };

        try {
            const response = await fetch('http://localhost:8000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });
            const data = await response.json();
            console.log('Reservation created:', data);
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Client ID:</label>
                <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} />
            </div>
            <div>
                <label>Slot ID:</label>
                <input type="text" value={slotId} onChange={(e) => setSlotId(e.target.value)} />
            </div>
            <div>
                <label>Date:</label>
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
            <div>
                <label>Status:</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
            <button type="submit">Réserver</button>
        </form>
    );
};

export default ReservationForm;
