import React, { useState, useEffect } from 'react';
import { baseUrl } from '../utils/service';

const ReservationForm = ({ selectedDate }) => {
    const [formData, setFormData] = useState({
        slot: '',
        client: '',
        status: 'pending',
    });
    const [slots, setSlots] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch slots data
        fetch(`${baseUrl}/slots`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => setSlots(data))
            .catch(error => console.error('Error fetching slots:', error));

        // Fetch clients data
        fetch(`${baseUrl}/users`)
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${baseUrl}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle form submission success
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    if (slots.length === 0 || clients.length === 0) {
        return <div>Loading...</div>;  // Show loading state if slots or clients data is not yet fetched
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Slot:
                <select name="slot" value={formData.slot} onChange={handleChange}>
                    {slots.map(slot => (
                        <option key={slot.id} value={slot.id}>{slot.name}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Client:
                <select name="client" value={formData.client} onChange={handleChange}>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Status:
                <input type="text" name="status" value={formData.status} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Create Reservation</button>
        </form>
    );
};

export default ReservationForm;
